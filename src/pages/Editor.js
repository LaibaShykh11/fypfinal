import React, { useCallback } from 'react'
import { useState, useEffect, useRef } from 'react'
import SplitPane from 'react-split-pane'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons'
import CodeMirror, { useCodeMirror } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import ACTIONS from '../Actions'

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  // States for HTML, CSS, JS, and combined output
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [output, setOutput] = useState('')
  const editorRefs = {
    html: useRef(null),
    css: useRef(null),
    js: useRef(null),
  }

  const { setContainer: setHtmlContainer } = useCodeMirror({
    container: editorRefs.html.current,
    extensions: [javascript({ jsx: true })],
    value: html,
  })

  const { setContainer: setCssContainer } = useCodeMirror({
    container: editorRefs.css.current,
    extensions: [javascript({ jsx: true })],
    value: css,
  })

  const { setContainer: setJsContainer } = useCodeMirror({
    container: editorRefs.js.current,
    extensions: [javascript({ jsx: true })],
    value: js,
  })

  useEffect(() => {
    setHtmlContainer(editorRefs.html.current)
    setCssContainer(editorRefs.css.current)
    setJsContainer(editorRefs.js.current)
  }, [])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        val: { html, css, js },
      })
    }
  }, [html, css, js])

  useEffect(() => {
    updateOutput()
  }, [html, css, js])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ val }) => {
        if (val !== null) {
          setHtml(val.html)
          setCss(val.css)
          setJs(val.js)
        }
      })
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  const updateOutput = () => {
    const combinedOutput = `
              <html>
                <head>
                  <style>${css}</style>
                </head>
                <body>
                  ${html}
                  <script>${js}</script>
                </body>
              </html>
              `
    setOutput(combinedOutput)
  }

  return (
    <div>
      {/* coding Section */}

      <div>
        {/* horizontal split */}
        <SplitPane
          split='horizontal'
          minSize={100}
          maxSize={-100}
          defaultSize={'60%'}
        >
          {/* Top code section placeholder */}
          <SplitPane split='vertical' minSize={500}>
            {/* HTML section */}
            <div className='w-full h-full flex flex-col items-start justify-start'>
              <div className='w-full flex items-center justify-between'>
                <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                  <FontAwesomeIcon className='text-red' icon={faHtml5} />
                  <p className='text-primaryText font-semibold'>HTML</p>
                </div>
              </div>
              <div className='w-full px-2 overflow-x-auto ref={editorRefs.html}'>
                <CodeMirror
                  value={html}
                  height='600px'
                  theme='dark'
                  extensions={[javascript({ jsx: true })]}
                  onChange={(val) => {
                    setHtml(val)
                    onCodeChange({ html: val, css, js })
                  }}
                />
              </div>
            </div>
            <SplitPane split='vertical' minSize={500}>
              {/* CSS section */}
              <div className='w-full h-full flex flex-col items-start justify-start'>
                <div className='w-full flex items-center justify-between'>
                  <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                    <FontAwesomeIcon className='text-sky-500' icon={faCss3} />
                    <p className='text-primaryText font-semibold'>CSS</p>
                  </div>
                </div>
                <div className='w-full px-2 overflow-x-auto ref={editorRefs.css}'>
                  <CodeMirror
                    value={css}
                    height='600px'
                    theme='dark'
                    extensions={[javascript({ jsx: true })]}
                    onChange={(val) => {
                      setCss(val)
                      onCodeChange({ html, css: val, js })
                    }}
                  />
                </div>
              </div>
              {/*JS Section */}
              <div className='w-full h-full flex flex-col items-start justify-start'>
                <div className='w-full flex items-center justify-between'>
                  <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                    <FontAwesomeIcon className='text-yellow-500' icon={faJs} />
                    <p className='text-primaryText font-semibold'>JS</p>
                  </div>
                </div>
                <div className='w-full px-2 overflow-x-auto ref={editorRefs.js}'>
                  <CodeMirror
                    value={js}
                    height='600px'
                    theme='dark'
                    extensions={[javascript({ jsx: true })]}
                    onChange={(val) => {
                      setJs(val)
                      onCodeChange({ html, css, js: val })
                    }}
                  />
                </div>
              </div>
            </SplitPane>
          </SplitPane>

          {/* Bottom result placeholder */}
          <div
            className='bg-white overflow-hidden h-full'
            style={{ overflow: 'hidden', height: '100%' }}
          >
            <iframe
              title='Result'
              srcDoc={output}
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
          </div>
        </SplitPane>
      </div>
    </div>
  )
}

export default Editor

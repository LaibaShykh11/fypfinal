import React, { useState } from 'react'
import '../App.css'

const Faqs = () => {
  // Define an array of FAQ items
  const faqsData = [
    {
      question: 'What can I use CodeCollab for?',
      answer:
        'You can use CodeCollab for everything code sharing, like pair programming, share code online with your team, tech interviews, teaching.',
    },
    {
      question: 'How can i create room in CodeCollab?',
      answer:
        'By clicking on NewRoom button through which a random ID of room will be generated and by sharing it you can invite friends.',
    },
    {
      question: 'Which Language CodeCollab support?',
      answer:
        'You can code in HTML, CSS and JS and it will show the output on screen in real-time.',
    },
    {
      question: 'How can I compile or run the code??',
      answer: 'it will show the output on screen in real-time.',
    },
    {
      question: 'how code will be modified by other people?',
      answer:
        'In real-time they will code together with you and you all can see each other work in real-time',
    },
  ]

  // State to store the active FAQ index
  const [activeIndex, setActiveIndex] = useState(null)

  // Function to toggle active state of FAQ item
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null)
    } else {
      setActiveIndex(index)
    }
  }

  return (
    <div className='container font-sans mx-auto min-h-[700px] flex-col justify-center items-center'>
      <h2 className='title text-center'>Frequently Asked Questions</h2>
      <div className='faq-list'>
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className='question'>{faq.question}</div>
            <div className='answer'>{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faqs

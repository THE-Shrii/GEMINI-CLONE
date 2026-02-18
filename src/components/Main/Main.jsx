import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const {
    onSent,
    recentPrompt,
    showResult,
    resultData,
    loading,
    setInput,
    input
  } = useContext(Context)

  const bottomRef = useRef(null)

  // Auto scroll when result updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [resultData, loading])

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">

        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Shrii</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">

              <div
                className="card"
                onClick={() => onSent("Explain how AI works in a few words")}
              >
                <p>Explain how AI works in a few words</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => onSent("Write a python code for a simple calculator")}
              >
                <p>Write a python code for a simple calculator</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => onSent("Brainstorm ideas for a new project")}
              >
                <p>Brainstorm ideas for a new project</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => onSent("Give me a summary of this topic")}
              >
                <p>Give me a summary of this topic</p>
                <img src={assets.code_icon} alt="" />
              </div>

            </div>
          </>
        ) : (
          <div className="result">

            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />

              {loading ? (
                <div className='loader'>
                  <hr style={{ width: "100%" }} />
                  <hr style={{ width: "90%" }} />
                  <hr style={{ width: "80%" }} />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>

            <div ref={bottomRef}></div>

          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
           <input
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !loading) {
                e.preventDefault();
                onSent();
                }
            }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
            disabled={loading}
            />

            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />


              <img
                onClick={() => input && onSent()}
                src={assets.send_icon}
                alt=""
                style={{
                    opacity: input ? 1 : 0.5,
                    cursor: input ? "pointer" : "not-allowed"
                }}
                />

            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Main

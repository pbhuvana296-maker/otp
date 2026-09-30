import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [error, setError] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [showFinalOtp, setShowFinalOtp] = useState(false);

  const inputRefs = useRef([]);

  /* =========================================
     GENERATE OTP
  ========================================= */

  const generateDynamicOTP = () => {
    const newOtp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    setGeneratedOtp(newOtp);
    setOtp(["", "", "", ""]);

    setIsVerified(false);
    setError(false);
    setIsFilling(false);
    setShowFinalOtp(false);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };


  /* =========================================
     INITIAL OTP
  ========================================= */

  useEffect(() => {
    generateDynamicOTP();
  }, []);


  /* =========================================
     NORMAL OTP TYPING
  ========================================= */

  const handleChange = (value, index) => {
    if (isFilling) return;

    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";

      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = cleanValue.slice(-1);

    setOtp(updatedOtp);
    setError(false);

    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  /* =========================================
     BACKSPACE
  ========================================= */

  const handleKeyDown = (e, index) => {
    if (isFilling) return;

    if (e.key === "Backspace") {

      if (otp[index]) {
        const updatedOtp = [...otp];

        updatedOtp[index] = "";

        setOtp(updatedOtp);

        return;
      }

      if (index > 0) {
        const updatedOtp = [...otp];

        updatedOtp[index - 1] = "";

        setOtp(updatedOtp);

        inputRefs.current[index - 1]?.focus();
      }
    }
  };


  /* =========================================
     PASTE OTP
  ========================================= */

  const handlePaste = (e) => {
    if (isFilling) return;

    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedValue) return;

    const updatedOtp = ["", "", "", ""];

    pastedValue
      .split("")
      .forEach((digit, index) => {
        updatedOtp[index] = digit;
      });

    setOtp(updatedOtp);
    setError(false);

    setTimeout(() => {
      inputRefs.current[
        Math.min(pastedValue.length, 3)
      ]?.focus();
    }, 50);
  };


  /* =========================================
     FILL CODE ANIMATION
  ========================================= */

  const fillCode = async () => {
    if (isFilling) return;

    setIsFilling(true);
    setError(false);
    setShowFinalOtp(false);

    const digits = generatedOtp.split("");

    /* -----------------------------------------
       STEP 1
       FIRST DIGIT
    ----------------------------------------- */

    setOtp(["", "", "", ""]);

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    setOtp([
      digits[0],
      "",
      "",
      ""
    ]);


    /* -----------------------------------------
       STEP 2
       SECOND DIGIT
    ----------------------------------------- */

    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );

    setOtp([
      digits[0],
      digits[1],
      "",
      ""
    ]);


    /* -----------------------------------------
       STEP 3
       THIRD DIGIT
    ----------------------------------------- */

    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );

    setOtp([
      digits[0],
      digits[1],
      digits[2],
      ""
    ]);


    /* -----------------------------------------
       STEP 4
       FOURTH DIGIT
    ----------------------------------------- */

    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );

    setOtp([
      digits[0],
      digits[1],
      digits[2],
      digits[3]
    ]);


    /* -----------------------------------------
       WAIT AFTER ALL 4 BOXES ARE FILLED
    ----------------------------------------- */

    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );


    /* -----------------------------------------
       REMOVE BOXES
    ----------------------------------------- */

    setShowFinalOtp(true);


    /* -----------------------------------------
       WAIT FOR FINAL OTP
    ----------------------------------------- */

    await new Promise((resolve) =>
      setTimeout(resolve, 1300)
    );


    /* -----------------------------------------
       SUCCESS
    ----------------------------------------- */

    setIsVerified(true);
    setIsFilling(false);
  };


  /* =========================================
     MANUAL VERIFY
  ========================================= */

  const verifyOtp = () => {
    if (isFilling) return;

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setError(true);
      return;
    }

    if (enteredOtp === generatedOtp) {
      setIsVerified(true);
    } else {
      setError(true);

      setTimeout(() => {
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }, 700);
    }
  };


  /* =========================================
     AUTO VERIFY MANUAL OTP
  ========================================= */

  useEffect(() => {
    if (isFilling) return;

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) return;

    if (enteredOtp === generatedOtp) {
      setTimeout(() => {
        setIsVerified(true);
      }, 400);
    }
  }, [otp, generatedOtp, isFilling]);


  /* =========================================
     UI
  ========================================= */

  return (
    <div className="container">

      {/* BACKGROUND GLOW */}
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>


      {/* MAIN TITLE */}
      <h1 className="main-title">
        OTP VERIFICATION
      </h1>


      {!isVerified ? (

        /* =====================================
           OTP CARD
        ===================================== */

        <div className="glass-card">

          {/* BRAND */}
          <div className="brand-name">
            GOOGLE
          </div>


          {/* HEADING */}
          <h2 className="title">
            ENTER PIN
          </h2>


          <p className="sub-text">
            Enter the 4-Digit Code
          </p>


          {/* =================================
              OTP BOXES
          ================================= */}

          {!showFinalOtp && (

            <div className="otp-inputs">

              {otp.map((value, index) => (

                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  className={`otp-box ${
                    value ? "filled" : ""
                  } ${
                    error ? "error-border" : ""
                  } ${
                    isFilling ? "filling" : ""
                  }`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={value}
                  disabled={isFilling}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      index
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  onPaste={handlePaste}
                />

              ))}

            </div>

          )}


          {/* =================================
              FINAL OTP
          ================================= */}

          {showFinalOtp && (

            <div className="final-otp-container">

              <div className="final-otp">
                {generatedOtp}
              </div>

              <div className="final-underline"></div>

            </div>

          )}


          {/* ERROR */}
          {error && !isFilling && (

            <div className="error-message">
              Invalid OTP. Please try again.
            </div>

          )}


          {/* =================================
              MESSAGE BOX
          ================================= */}

          {!showFinalOtp && (

            <div className="message-box">

              <div className="message-content">

                <div className="message-title">
                  MESSAGE
                </div>

                <div className="message-text">
                  GOOGLE Verification Code is{" "}
                  <span className="bold-white">
                    {generatedOtp}
                  </span>
                </div>

              </div>


              {/* FILL CODE */}
              <button
                className="fill-code-btn"
                type="button"
                disabled={isFilling}
                onClick={fillCode}
              >
                {isFilling
                  ? "Filling..."
                  : "Fill Code"}
              </button>

            </div>

          )}


          {/* =================================
              NORMAL BUTTONS
          ================================= */}

          {!isFilling &&
            !showFinalOtp && (

              <div className="button-group">

                <button
                  className="verify-btn"
                  type="button"
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>


                <button
                  className="resend-btn"
                  type="button"
                  onClick={generateDynamicOTP}
                >
                  Generate New OTP
                </button>

              </div>

            )}

        </div>

      ) : (

        /* =====================================
           SUCCESS CARD
        ===================================== */

        <div className="glass-card success-card">

          <div className="success-icon-container">

            <div className="success-icon">
              ✓
            </div>

          </div>


          <h2 className="title">
            Number Verified
          </h2>


          <p className="success-text">
            You are logged in on this device.
          </p>


          <button
            className="continue-btn"
            type="button"
            onClick={generateDynamicOTP}
          >
            Continue
          </button>

        </div>

      )}

    </div>
  );
}


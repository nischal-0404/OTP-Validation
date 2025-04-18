import React, { useRef, useState } from "react";
/**  Features:
 * 1. Shift foucs when input field is not empty
 * 2. All the input field only accepts number
 */

function OTP() {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const inputRef = useRef(Array(5).fill(null));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // avoids executing code futher if user inputs except number

    const newOTP = [...otp];
    newOTP[index] = value.slice(-1);
    setOtp(newOTP);
    if (value && index < 5) {
      //Shifts focus to next input field when current input field is not empty
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyUp = (e, index) => {
    const isKey = e.key;
    console.log(isKey);

    // When user press backspace key it clears the current input and shifts focus back to previous input
    if (isKey === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRef.current[index - 1].focus();
    }

    //Shifts foucs left when press arrowKey right
    if (isKey === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1].focus();
    }
    //Shifts foucs left when press arrowKey left
    if (isKey === "ArrowRight" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const copiedData = e.clipboardData.getData("text");
    console.log(copiedData);

    // Filter out any non-numberic data
    const copiedDigits = copiedData.replace(/\D/g, "");
    if (!copiedDigits) return;

    console.log(copiedData);
    const newOtp = [...otp];

    for (let i = 0; i < copiedDigits.length && index + i < 5; i++) {
      newOtp[index + i] = copiedDigits[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(index + copiedDigits.length, 5);
    inputRef.current[focusIndex]?.focus();
  };

  const handleClick = () => {
    const optValue = otp.join("");
    if (optValue.length === 5) {
      alert("Otp submitted successfully.");
    } else {
      alert("Incomplete OTP digits.");
    }
  };
  return (
    <div className="border p-[2.2rem] rounded  shadow-xl">
      <div>
        <h2 className="text-center font-bold text-[1.5rem]">
          OTP Verification
        </h2>
        <div className="space-x-[.8rem] mt-[1rem]">
          {otp.map((digit, index) => {
            return (
              <input
                type="text"
                value={digit}
                ref={(el) => {
                  inputRef.current[index] = el;
                }}
                key={index}
                maxLength={1}
                onPaste={(event) => {
                  // paste eventlistener
                  handlePaste(event, index);
                }}
                onKeyUp={(event) => {
                  // which key pressed listener
                  handleKeyUp(event, index);
                }}
                onChange={(event) => {
                  handleChange(event, index);
                }}
                className="w-[3.5rem] h-[3.5rem] border rounded text-center text-[1.4rem] font-semibold  text-shadow"
              />
            );
          })}
        </div>
      </div>

      <div className="mt-[1rem] text-center ">
        <button
          className="h-[3rem] w-full text-[1.1rem] bg-purple-500 rounded font-semibold text-white shadow-sm "
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default OTP;

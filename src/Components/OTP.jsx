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

  return (
    <div className="border p-[2.2rem] rounded  shadow-xl">
      <div>
        <h2 className="text-center font-bold text-[1.5rem]">
          OTP Verification
        </h2>
        <div className="space-x-[.8rem] mt-[1rem]">
          {otp.map((digit, index) => {
            console.log(digit);
            return (
              <input
                type="text"
                value={digit}
                ref={(el) => {
                  inputRef.current[index] = el;
                }}
                key={index}
                maxLength={1}
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
        <button className="h-[3rem] w-full text-[1.1rem] bg-purple-500 rounded font-semibold text-white  ">
          Submit
        </button>
      </div>
    </div>
  );
}

export default OTP;

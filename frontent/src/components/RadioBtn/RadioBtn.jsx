import React from "react";
import "../RadioBtn/RadioBtn.css";

function RadioBtn({ userType, setUserType }) {
  return (
    <>
      <div className="radio-buttons-container">
        <div className="radio-button">
          <input
            name="radio-group"
            className="radio-button_input"
            id="radio2"
            checked={userType === "student"}
            type="radio"
            onChange={() => setUserType("student")}
          />
          <label htmlFor="radio2" className="radio-button_label">
            <span className="radio-button_custom" />
            Student
          </label>
        </div>
        <div className="radio-button">
          <input
            name="radio-group"
            id="radio2"
            type="radio"
            className="radio-button_input"
            checked={userType === "teacher"}
            onChange={() => setUserType("teacher")}
          />
          <label htmlFor="radio2">
            <span className="radio-button_custom" />
            Teacher
          </label>
        </div>
      </div>
    </>
  );
}

export default RadioBtn;

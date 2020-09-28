import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input } from "antd";
import { getByLabelText } from "@testing-library/react";

const Text = ({
  styling,
  label,
  list,
  tips,
}) => {

  const [item, setItem] = useState({
    value: ''
  })

  //Validation
  function validateItem(item) {
    if (!list.includes(item)) {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }

    return {
      validateStatus: "error",
      errorMsg: "Create function to show error message" //getUsernameError()
    };
  }
  

  const onItemChange = (value) => {
    setItem({ ...validateItem(value), value: value });
  };


  return (
    <Form.Item
      {...styling}
      label={label}
      validateStatus={item.validateStatus}
      help={item.errorMsg || tips}
    >
      <Input
        value={item.value}
        onChange={({ target }) => onItemChange(target.value)}
      />
    </Form.Item>
  )
}

export default Text
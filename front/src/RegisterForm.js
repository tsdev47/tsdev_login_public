/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Button, Checkbox, Form, Input, Radio } from "antd"
import { PasswordInput } from "antd-password-input-strength";
// functions:
import getFormaJuridica from './functions/getFormaJuridica'
import languages from './data/labels'
import userService from './services/users'
import { formItemLayout, formItemLayoutSM, tailLayout } from './styles/Form.js'


const RegisterForm = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [allEmails, setAllEmails] = useState([])
  const [allCompanies, setAllCompanies] = useState([])
  const [allCompanyTaxIds, setAllCompanyTaxIds] = useState([])
  const [agreementStatus, setAgreementStatus] = useState(true)
  const [companyType, setCompanyType] = useState(true)
  const [newCompany, setNewCompany] = useState(false)
  const [name, setName] = useState({
    value: ''
  });
  const [email, setEmail] = useState({
    value: ''
  })
  const [companyNif, setCompanyNif] = useState({
    value: ''
  })
  const [businessName, setBusinessName] = useState({
    value: ''
  })
  const [password, setPassword] = useState({
    value: ''
  })
  const [password2, setPassword2] = useState({
    value: ''
  })

  //keep an eye on user changes
  useEffect(() => {
    console.log(`* allEmails: ${JSON.stringify(allEmails)}`)
    console.log(`* allCompanies: ${JSON.stringify(allCompanies)}`)
    console.log(`* allCompanyTaxIds: ${JSON.stringify(allCompanyTaxIds)}`);
  }, [allEmails, allCompanies, allCompanyTaxIds]);

  useEffect(() => {
    userService.allEmails()
    .then(all => setAllEmails(all.map(e => e.email)))
    userService.allCompanies()
    .then(all => setAllCompanies(all.map(c => c.company)))
    userService.allCompanyTaxIds()
    .then(all => setAllCompanyTaxIds(all.map(i => i.companyNif)))
  }, [])

  const getLabel = (type) => languages[props.language][type]
  const getErrorMsg = (type, value, length) => value.length < length 
    ? languages[props.language]['minLength'].replace("${length}", length)
    : languages[props.language][type]

  const validateItem = (value, list, error, length) => 
    !list.includes(value || value.toLowerCase() || value.toUpperCase()) && value.length >= length
    ? { validateStatus: "success", errorMsg: null}
    : { validateStatus: "error", errorMsg: error }

  const validatePassword = (password, value, error) => value === password.value
    ? { validateStatus: "success", errorMsg: null}
    : { validateStatus: "error", errorMsg: error }

  // Handler functions
  const onNameChange = (value) => {
    setName({ ...validateItem(value, [], getErrorMsg('minLength', value, 2), 2), value: value })
  }

  const onEmailChange = (value) => {
    setEmail({ ...validateItem(value, allEmails, getErrorMsg('emailErrorMessage', value, 3), 3), value: value })
  }

  const onCompanyNifChange = (value) => {
    setCompanyNif({ ...validateItem(value, allCompanyTaxIds, getErrorMsg('companyTaxIdErrorMessage', value, 8), 8), value: value })
    if (props.language === 'ESes') {setCompanyType(getFormaJuridica(value))}
  }

  const onPasswordChange = (value) => {
    setPassword({ ...validateItem(value, [''], getErrorMsg(null, value, 8), 8), value: value })
  }

  const onPassword2Change = (value) => {
    setPassword2({ ...validatePassword(password, value, getErrorMsg('passwordErrorMessage', value, 0)), value: value })
  }

  const addUser = () => {
    userService.addUser({
      name: name.value,
      email: email.value,
      password: password.value,
      companyNif: companyNif.value,
      company: businessName.value 
    }).then(
      setName(''),
      setEmail(''),
      setPassword(''),
      setPassword2(''),
      setCompanyNif(''),
      setBusinessName('')
    )
  }

  return (
    <Form onFinish={() => addUser()}>
      <Form.Item {...tailLayout}>
        <Radio.Group defaultValue="user" buttonStyle="solid">
          <Radio.Button onClick={() => setNewCompany(false)} value="user">{getLabel('labelCreateUser')}</Radio.Button>
          <Radio.Button onClick={() => setNewCompany(true)} value="company">{getLabel('labelCreateCompany')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label={getLabel('labelName')}
        validateStatus={name.validateStatus}
        help={name.errorMsg}
      >
        <Input
          value={name.value}
          onChange={({ target }) => onNameChange(target.value)}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label='Email'
        validateStatus={email.validateStatus}
        help={email.errorMsg}
      >
        <Input
          value={email.value}
          onChange={({ target }) => onEmailChange(target.value)}
        />
      </Form.Item>
      {
        newCompany
        ? <>
          <Form.Item
            {...formItemLayoutSM}
            label={getLabel('labelNifCompany')}
            validateStatus={companyNif.validateStatus}
            help={companyNif.errorMsg}
          >
            <Input
              value={companyNif.value}
              onChange={({ target }) => onCompanyNifChange(target.value)}
              min='8'
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={getLabel('labelBusinessName')}
            //validateStatus={businessName.validateStatus}
            help={businessName.errorMsg}
          >
            <Input
              addonAfter={companyType}
              value={businessName.value}
              onChange={({ target }) => setBusinessName({ value: target.value })}
              min='9'
            />
          </Form.Item>
        </>
        : null
      }
      <Form.Item
        {...formItemLayout}
        label={getLabel('labelPassword')}
        validateStatus={password.validateStatus}
        help={password.errorMsg}
      >
        <PasswordInput
          value={password.value}
          onChange={({ target }) => onPasswordChange(target.value)}
          min='9'
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label={getLabel('labelPassword2')}
        validateStatus={password2.validateStatus}
        help={password2.errorMsg}
      >
        <Input.Password
          value={password2.value}
          onChange={({ target }) => onPassword2Change(target.value)}
          min='9'
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Checkbox 
          onChange={() => agreementStatus ? setAgreementStatus(false) : setAgreementStatus(true)}
        >
          {getLabel('labelAgreement')}
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={agreementStatus}>
          {getLabel('registerButLabel')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

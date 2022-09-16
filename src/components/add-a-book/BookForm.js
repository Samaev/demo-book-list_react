/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Container,
} from "react-bootstrap";
import {
  Link,
} from "react-router-dom";
import Categories from "./Categories";


export default function BookForm({ match }) {
  const [title, setTitle] = useState("");
  const[active, setActive] = useState(false);
  const [aName, setaName] = useState("");
  const [cat, setCat] = useState("Drama");
  const [ISBN, setISBN] = useState("");
  const [edit, setEdit] = useState(false);
  const handleEdit = async () => {
    setEdit(true);
    let el = await axios
      .get(`http://localhost:3010/books/${match.params.id}`)
      .then((res) => {
        setTitle(res.data.book_name);
        setaName(res.data.author_name);
        setCat(res.data.category);
        setISBN(res.data.ISBN);
        setActive(true);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    if (match.params.id) {
      handleEdit();
    }
  }, []);

  const resetF = () => {
    setTitle("");
    setaName("");
    setCat("");
    setISBN("");
  };

  function handleCat(e) {
    setCat(e.target.value);
  }

  async function handleSubmitButton() {
    if (edit) {
      axios
        .patch(`http://localhost:3010/books/${match.params.id}`, {
          id: match.params.id,
          book_name: title,
          author_name: aName,
          category: cat,
          ISBN: ISBN,
          active: active,
        })
        .then(() => alert("Successfull update"))
        .catch((err) => alert(err));
    } else {
      let ind = await axios
        .get(`http://localhost:3010/books`)
        .then((res) => {
          return res.data[res.data.length - 1].id;
        })
        .catch((err) => alert(err));
      ind += 1;
      axios
        .post(`http://localhost:3010/books`, {
          id: ind,
          book_name: title,
          author_name: aName,
          category: cat,
          ISBN: ISBN,
          active: active,
        })
        .then((res) => alert(`Book successfully added with index: ${ind}`))
        .catch((err) => alert("something went wrong: " + err));

      window.location.replace("/")
    }
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      handleSubmitButton();
      resetF();
      setValidated(true);
    }
    setValidated(true);
    //
  };
  return (
    <>
      <Col xl={2} sm={2} md={2}>
        <Link to="/">
          <Button variant="outline-primary" size="sm" block>
            &lt; Dashboard
          </Button>
        </Link>
      </Col>
      <Container>
        <h1>{edit ? "Edit book" : "Add new book"}</h1>

        <Col xl={12}>
          <br />
          <br />
          <Col xl={9}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="title">
                <Form.Label column sm={2}>
                  Book title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Enter here book title"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter book title.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="aName">
                <Form.Label column sm={2}>
                  Author name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="text"
                    value={aName}
                    onChange={(e) => setaName(e.target.value)}
                    placeholder="Enter here author name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter author name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Category
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    htmlSize={3}
                    custom
                    required
                    as="select"
                    onChange={handleCat}
                  >
                    <Categories />
                    <Form.Control.Feedback type="invalid">
                      Please choose genre.
                    </Form.Control.Feedback>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="ISBN">
                <Form.Label column sm={2}>
                  International Standard Book Number
                </Form.Label>
                <Col sm={10}>
                  <InputGroup hasValidation>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">ISBN</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      pattern="\d*"
                      maxLength="13"
                      minLength="13"
                      value={ISBN}
                      required
                      onChange={(e) => setISBN(e.target.value)}
                      placeholder="Enter here international Standard Book Number"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter ISBN (13 digits).
                    </Form.Control.Feedback>
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  {/* <Alert
                      variant="danger"
                      style={{
                        display:
                          aName.length > 0 &&
                          title.length > 0 &&
                          ISBN.length === 13
                            ? "none"
                            : "",
                      }}
                    >
                      <Alert.Heading>
                        Red bordered inputs cannot be empty!
                      </Alert.Heading>
                      <p style={{ display: title.length > 0 ? "none" : "" }}>
                        Please enter Book title
                      </p>
                      <p style={{ display: aName.length > 0 ? "none" : "" }}>
                        Please enter Author name
                      </p>
                      <p style={{ display: ISBN.length === 13 ? "none" : "" }}>
                        Please enter correct ISBN number (13 digits){" "}
                        {13 - ISBN.length} left
                      </p>
                    </Alert> */}
                  <Button
                    type="submit"
                    size="lg"
                    block
                    // onClick={handleClick}
                    // disabled={
                    //     aName.length < 1 ||
                    //     title.length < 1 ||
                    //     ISBN.length !== 13
                    //   }
                  >
                    {edit ? `Save as #${match.params.id}` : "Add a Book"}
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Col>
      </Container>
    </>
  );
}

import React, { useEffect, useState } from "react";

export function SearchBar({ onSetFilter }) {
  const [txt, setTxt] = useState('')

  useEffect(() => {
    onSetFilter(txt)
  }, [txt])

  function handleChange(ev) {
    const { value } = ev.target
    setTxt(value)
  }

  // function handleSubmit(ev) {
  //   ev.preventDefault()
  //   onSetFilter(txt)
  // }

  function cleanForm() {
    setTxt('')
  }

  return (
    // <form onSubmit={handleSubmit}>
    <section className="search-bar-cmp">
      <form>
        <input
          name="txt"
          value={txt}
          type="text"
          placeholder="Artists, songs or podcasts"
          autoComplete="off"
          onChange={handleChange}
        />
        <a
          className="search-button"
          onClick={cleanForm}
        >
          <div className="icon" />
        </a>
      </form>
    </section>
  )
}

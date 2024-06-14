import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

/**
 * SearchForm
 *
 * Props: handleSearch
 *
 * State: search term
 *
 */
type tHandleSearch = (term: string)=> Promise<void>

function SearchForm({ handleSearch }: {handleSearch: tHandleSearch}) {
  console.log("SearchForm");
  const [term, setTerm] = useState("");

  /** Handle submission of search form, passes a term with no trailing spaces */
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    console.log("SearchForm: handleSubmit", {term})

    handleSearch(term.trim());
  }

  /** Handle change for form inputs */
  function handleChange(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    setTerm(evt.target.value);
  }

  return (
    <Form className="SearchForm" onSubmit={handleSubmit}>
      <Label htmlFor="SearchForm"></Label>
      <Input
        id="SearchForm-value"
        value={term}
        onChange={handleChange}
        placeholder="Enter Search Term..."
      />
      <Button>Search!</Button>
    </Form>
  );
}

export default SearchForm;

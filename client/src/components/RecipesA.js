import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function RecipesA() {

  // useEffect(()=> {
  //   getRecipes();
  // }, [])

  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("");
  const [intolerance, setIntolerance] = useState("");
  const [mealType, setMeal] = useState("");
  const [userInput, setInput] = useState("");  

  // should we put into the DB table? 
  const dietOptions = [
    { value: 'gluten-free', label: 'gluten-free' },
    { value: 'ketogenic', label: 'ketogenic' },
    { value: 'vegetarian', label: 'vegetarian'}
  ]

  const mealTypes = [
    { value: 'main course', label: 'main course'},
    { value: 'snack', label: 'snack'},    
    { value: 'breakfast', label: 'breakfast'}
  ]

  const intolerances = [
    {value: "dairy", label: "dairy"},
    {value: "egg", label: "egg"},
    {value: "soy", label: "soy"}
  ]

  let intoleranceAPI = intolerance.map((e) => e.value)
  let dietAPI = diet.map((e)=>e.value);
  let mealTypeAPI = mealType.map((e)=>e.value);

  //const [diets, setDiets] = useState(["gluten-free","ketogenic", "vegetarian", "lacto-vegetarian", "ovo-vegetarian", "vegan", "pescetarian","paleo", "whole30"]);
  //const [meals, setMeals] = useState(["main course", "dessert", "breakfast", "snack"]);
  //const [intolerances, setIntolerances] = useState(["dairy","egg", "gluten", "peanut","soy", "seafood", "wheat"])
  // let intolerances = "Dairy";
  // let mealType = "dessert";
  // let userInput = "banana";

   const getRecipes = async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${userInput}&diet=${dietAPI}&intolerances=${intoleranceAPI}&type=${mealTypeAPI}&number=5&addRecipeInformation=true`);
    const data = await api.json();
    setRecipes(data);
    console.log(data);
    console.log("Data.results is ", data.results);
    console.log("Data.results[0] is ", data.results[0]);
    console.log("Data.results[1].summary is ", data.results[1].summary);
    console.log(data.results[0].image);

  }

  function handleInput (e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getRecipes();
   }

  return (
    <div>Recipes search

     

        <form onSubmit={handleSubmit}>

        <div className="row">
        <div className="col-sm-6">
        <div className="card">
        <div className="card-header bg-success"> Select your diet restrictions  </div>

        <div className="card-body">


        <div className='form-group'>
                        

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[dietOptions[0]]}
          isMulti
          options={dietOptions}
          onChange={(value)=>setDiet(value)}

        />           
        </div>

        </div>
        </div>
        </div>
        </div>

        <div className="row">
        <div className="col-sm-6">
        <div className="card">
        <div className="card-header bg-success">  Select meal type   </div>

        <div className="card-body">
                      
          <div className='form-group'>           
            
            <label className='form-label'>Meal type
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[mealTypes[0]]}
                isMulti
                options={mealTypes}
                onChange={(value) => setMeal(value)}
              />                          
            </label>          


            
            <label className='form-label'> Intolerances
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[mealTypes[0]]}
                isMulti
                options={intolerances}
                onChange={(value)=> setIntolerance(value)}
            />
            </label>     

          </div>

          </div>
        </div>
        </div>
        </div>


        <div className="row">
        <div className="col-sm-6">
        <div className="card">
        <div className="card-header bg-success"> Search by ingredient, recipe name or random word </div>
        <div className="card-body">

        <div className='form-group'>                       
               <input className = "form-control" onChange={(e) => handleInput(e)} value={userInput}/>
                        
        </div>
        </div>
        </div>
        </div>
        </div>

        <button className="btn btn-success center" type="submit">Search recipes</button>

        </form>           




    
  <Container fluid>
   <Row>
    <Col> 
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
     </Col>
    
    <Col> Recipe 2 </Col>
    <Col> Recipe 3</Col>
   </Row>
   <Row>
   <Col> Recipe 1 </Col>
    <Col> Recipe 2 </Col>
    <Col> Recipe 3</Col>
   </Row>


  </Container>
      



    </div>
  )
}

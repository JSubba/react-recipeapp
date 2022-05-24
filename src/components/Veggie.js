import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await response.json();

      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data.recipes);
    }
  };

  useEffect(() => {
    getVeggie();
  }, []);

  return (
    <Wrapper>
      <h4>Vegetarian Recipes</h4>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "1rem",
        }}
      >
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient></Gradient>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 1rem;
`;
const Card = styled.div`
  position: relative;
  min-height: 10rem;
  min-width: 15vw;
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;

  p {
    position: absolute;
    bottom: 10%;
    color: white;
    font-weight: 600;
    z-index: 10;
    transform: translate(5%, 0%);
  }

  img {
    position: absolute;
    left: 0;
    object-fit: cover;
  }
`;
const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
`;

export default Veggie;

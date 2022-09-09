import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Spinner from '../../components/spinner/spinner.component';

import ProductCard from '../../components/product-card/product-card.component';


import { CategoryContainer, Title } from './category.styles';

const GET_COLLECTIONS_BY_TITLE = gql`
  query($title:String!) {
  getCollectionsByTitle(title: $title){
    id
    title
    items{
      id
      name
      price
      imageUrl
    }
  }
}
`

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const {data, loading} = useQuery(GET_COLLECTIONS_BY_TITLE, {variables: {title: category}});


  console.log(data);


  useEffect(() => {
    if(data){
      const {items} = data.getCollectionsByTitle;
      setProducts(items); 
    }
    
  }, [category, data]);

  if(loading){
    console.log('spinner activated');
    return <Spinner />
  }

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

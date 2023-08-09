import { Box, InputBase, ListItem, List, styled } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { products } from '../../constants/data';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
background: #fff;
width: 36%;
border-radius: 2px;
margin-left: 10px;
display: flex;
`;

const InputSearchBase = styled(InputBase)`
padding-left: 20px;
width: 100%;
font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
margin-left: auto;
color: blue;
padding:  5px;
display: flex;
`
const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;


const Search = () => {

    const [text, setText] = useState();
    const [open, setOpen] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(text ? false : true);
    }

    return (
        <SearchContainer>
            <InputSearchBase placeholder='Search for products, brands and more' type='text' onChange={(e) => getText(e.target.value)} />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {
                text &&
                <ListWrapper hidden={open}>
                    {
                        products.filter(product => product.title.toLowerCase().includes(text.toLowerCase())).map((product) => (
                            <ListItem>
                                <Link key={product.id}
                                    state={{ id: product.id - 1 }} to={`product/${product.id}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => setOpen(true)}
                                >
                                    {product.title}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search
import React, { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import { useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import Shared from "../../utils/shared";
import { useCartContext } from "../../context/cart";
import { defaultFilter } from "../../constant/constant";
import bookService from "../../service/book.service";
import { productListingStyle } from "./style";
import categoryService from "../../service/category.service";
import { materialCommonStyles } from "../../utils/materialCommonStyles";

const Book = ()=>{
  const materialClasses = materialCommonStyles();
  const cartContext = useCartContext();
  const classes = productListingStyle();
  const [sortBy, setSortBy] = useState();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(defaultFilter);
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);
 
  const addToCart = (book) => {
    Shared.addToCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };

  // const [filters, setFilters] = useState(defaultFilter);
  const authContext = useAuthContext();
    return (
      <>
      <div className='con' style={{textAlign:"center",fontSize:35,textDecoration:"underline",textDecorationColor:"red",textDecorationStyle:"solid 2px"
    ,textUnderlinePosition:"under"}}>BookListing   </div>
      <div className={classes.productListWrapper}>
      <div container className="title-wrapper">
          <Grid item xs={6}>
            <Typography variant="h5">
              Total
              <span> - {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <div className="dropdown-wrapper">
            <TextField
              id="text"
              className="dropdown-wrapper"
              name="text"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>
          </div>
          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select 
              className={materialClasses.customSelect}
              MenuProps={{
                classes: { paper: materialClasses.customSelect },
              }}
              onChange={sortBooks}
              value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
      
      <div style={{alignItems:"center",flexWrap:"wrap",justifyContent:"center",display:"flex",flexDirection:"row",marginLeft:14}}>
        {books.map((book,index) =>(
        <Card sx={{maxWidth:300,margin:2,marginTop:4,border:"none" }}>
        <CardActionArea style={{height:"46rem"}}>
          <CardMedia style={{height:"20rem"}}
            component="img"className='mt-3'
            image={book.base64image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {book.name}
            </Typography>
            <Typography>
              {book.category}
            </Typography>
            <Typography variant="h2" color="text.secondary" style={{fontSize: "16px",
              height: "40px",
              display: "-webkit-box",
              "-webkit-line-clamp": 2,
              "-webkit-box-orient": "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",}}>
          {book.description}
            </Typography>
            <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span
                        className="MuiButton-label"
                        onClick={() => addToCart(book)}
                      >
                        ADD TO CART
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
          </CardContent>
        </CardActionArea>
      </Card>

        ))}
    
        </div>  
      <div className="pagination-wrapper" >
      <Pagination
        count={bookResponse.totalPages}
        page={filters.pageIndex}
        onChange={(e, newPage) => {
          setFilters({ ...filters, pageIndex: newPage });
        }}
      />
      </div>
    </div>
      </>
    
    )

}
export default Book;
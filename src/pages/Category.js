import * as React from "react";
import { Grid } from "@mui/material";
import Header from "../shared/Header";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { GiFruitBowl } from "react-icons/gi";
import { GiBedLamp } from "react-icons/gi";
import { MdFaceRetouchingNatural } from "react-icons/md";
import ProdCategory from "../components/ProdCategory";
import readyToEat from "../assets/readyToEat.jpg";
import "./Category.css";
import SubCategoryBtn from "../components/SubCategoryBtn";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const categories = [
  {
    id: 0,
    categoryName: "Ready To Eat",
    subCategory: ["Fruits & Vegetables", "Snacks", "Beverages", "Dairy"],
    icon: <EmojiFoodBeverageIcon />,
  },
  {
    id: 1,
    categoryName: "Grocery",
    subCategory: ["Spices", "Dry Fruits", "Flours & Oils", "Grains & Pulses"],
    icon: <GiFruitBowl />,
  },
  {
    id: 2,
    categoryName: "Personal Care",
    subCategory: ["Face", "Hair", "Body"],
    icon: <MdFaceRetouchingNatural />,
  },
  {
    id: 3,
    categoryName: "Home Essentials",
    subCategory: ["Bedroom", "Washroom", "Puja Room", "Garden"],
    icon: <GiBedLamp />,
  },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
const baseUrl = 'http://localhost:8989/api/v7';

export default function Category() {
  // const [open, setOpen] = React.useState(true);
  // const { id } = useParams();
  const [currentCategory, setCurrentCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState([]);
  const params = useParams();

  useEffect(() => {
    axios.get(`${baseUrl}/categories/${params.categoryName}`).then((response) => {
      setCurrentCategory(params.categoryName);
      console.log(currentCategory);
      setSubCategory(response.data)
    }).catch(error => {
      if (!error.response) {
        // network error
        console.log('Error: Network Error');
      } else {
        console.log(error.response);
      }
    })
  }, [])
  // console.log("Data", data.subCategory);


  return (
    <div className="category-container">
      <Header />
      <Grid container>
        {/* <Grid container className="category-image">
          <div className="image">
            <img src={readyToEat} alt="category" />
          </div>
          <div className="desc">
            <h1>Ready to Eat</h1>
          </div>
        </Grid> */}

        <Grid container className="banner-container">
          <Grid container className="button-container">
            <Grid xs={12}>
              <SubCategoryBtn category={currentCategory} />
            </Grid>
          </Grid>
          {subCategory.map((item, i) => {
            return (
              <ProdCategory subCategory={item} />
            )
          })}
        </Grid>

        {/* <Grid container sm={3} sx={{ padding: "10px" }}>
          <Box sx={{ display: "flex" }}>
            <ThemeProvider
              theme={createTheme({
                components: {
                  MuiListItemButton: {
                    defaultProps: {
                      disableTouchRipple: true,
                    },
                  },
                },
                palette: {
                  mode: "dark",
                  primary: { main: "rgb(102, 157, 246)" },
                  background: { paper: "rgb(5, 30, 52)" },
                },
              })}
            >
              <Paper elevation={0} sx={{ maxWidth: 256 }}>
                <FireNav component="nav" disablePadding>
                  <ListItemButton component="a" href="#customized-list">
                    <ListItemText
                      sx={{ my: 0 }}
                      primary="Choose Category"
                      primaryTypographyProps={{
                        fontSize: 20,
                        fontWeight: "medium",
                        letterSpacing: 0,
                      }}
                    />
                  </ListItemButton>
                  <Divider />

                  <Divider />
                  {categories.map((category, i) => {
                    return (
                      <Box
                        sx={{
                          bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                          pb: open ? 2 : 0,
                        }}
                      >
                        <ListItemButton
                          alignItems="flex-start"
                          onClick={() => setOpen(!open)}
                          sx={{
                            px: 3,
                            pt: 2.5,
                            pb: open ? 0 : 2.5,
                            "&:hover, &:focus": {
                              "& svg": { opacity: open ? 1 : 0 },
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: "inherit" }}>
                            {category.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={category.categoryName}
                            primaryTypographyProps={{
                              fontSize: 15,
                              fontWeight: "medium",
                              lineHeight: "20px",
                              mb: "2px",
                            }}
                            secondary={category.subCategory.join(",")}
                            secondaryTypographyProps={{
                              noWrap: true,
                              fontSize: 12,
                              lineHeight: "16px",
                              color: open
                                ? "rgba(0,0,0,0)"
                                : "rgba(255,255,255,0.5)",
                            }}
                            sx={{ my: 0 }}
                          />
                          <KeyboardArrowDown
                            sx={{
                              mr: -1,
                              opacity: 0,
                              transform: open ? "rotate(-180deg)" : "rotate(0)",
                              transition: "0.2s",
                            }}
                          />
                        </ListItemButton>
                        {open &&
                          category.subCategory.map((item) => (
                            <ListItemButton
                              key={item}
                              sx={{
                                py: 0,
                                minHeight: 32,
                                color: "rgba(255,255,255,.8)",
                              }}
                            >
                              {/* <ListItemIcon sx={{ color: 'inherit' }}>
                                                            {item.icon}
                                                        </ListItemIcon> */}
        {/* <ListItemText
                                primary={item}
                                primaryTypographyProps={{
                                  fontSize: 14,
                                  fontWeight: "medium",
                                }}
                              />
                            </ListItemButton>
                          ))}
                      </Box>
                    );
                  })}
                </FireNav>
              </Paper>
            </ThemeProvider>
          </Box>
        </Grid> */}
      </Grid>
    </div>
  );
}

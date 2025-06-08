import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import CategoryIcon from "@mui/icons-material/Category";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YardIcon from "@mui/icons-material/Yard";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "@mui/material";
import axios from "axios";

const baseUrl = 'http://localhost:8989/api';
// const itemData = [
//   {
//     id: 0,
//     categoryName: "Ready To Eat",
//     subCategory: ["Fruits & Vegetables", "Snacks", "Beverages", "Dairy"],
//     icon: <EmojiFoodBeverageIcon />,
//   },
//   {
//     id: 1,
//     categoryName: "Personal Care",
//     subCategory: ["Face", "Hair", "Body"],
//     icon: <FaceRetouchingNaturalIcon />,
//   },
//   {
//     id: 2,
//     categoryName: "Groceries",
//     subCategory: ["Spices", "Dry Fruits", "Flours & Oils", "Grains & Pulses"],
//     icon: <LocalGroceryStoreIcon />,
//   },
//   {
//     id: 3,
//     categoryName: "House Essentials",
//     subCategory: ["Bedroom", "Washroom", "Puja Room", "Garden"],
//     icon: <YardIcon />,
//   },
// ];

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

export default function CustomizedList() {
  const [state, setState] = React.useState(null);
  const [itemData, setItemData] = React.useState([]);
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(null);
  const navigate = useNavigate();

  const handleOpen = (clickedIndex) => {
    if (isOpenCollapse === clickedIndex) {
      setIsOpenCollapse(null);
    } else {
      setIsOpenCollapse(clickedIndex);
    }
  };

  React.useEffect(() => {
    axios.get(`${baseUrl}/v7/categories`).then((res) => {
      setItemData(res.data);
    })
  })
    

  return (
    <Box sx={{ display: "flex", backgroundColor: "#000" }}>
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
          <FireNav component="nav">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "15px",
              }}
            >
              <ListItemIcon sx={{ fontSize: 20 }}>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Choose Category"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
            </div>
            <Divider />
            {itemData.map((item, index) => {
              // setOpen(state[item.id] || false)
              return (
                <Box
                  key={item.categoryId}
                  sx={{
                    bgcolor: state ? "rgba(71, 98, 130, 0.2)" : null,
                    pb: state ? 2 : 0,
                  }}
                >
                  <ListItemButton
                    key={item.categoryId}
                    alignItems="flex-start"
                    sx={{
                      px: 3,
                      pt: 2.5,
                      pb: state ? 0 : 2.5,
                      "&:hover, &:focus": {
                        "& svg": { opacity: state ? 1 : 0 },
                      },
                    }}
                    onClick = {()=> handleOpen(index)}
                    
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.categoryName}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: "medium",
                        lineHeight: "20px",
                        mb: "2px",
                      }}
                      secondary={item.subCategoryName.join(',')}
                      secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: state
                          ? "rgba(0,0,0,0)"
                          : "rgba(255,255,255,0.5)",
                      }}
                      sx={{ my: 0 }}
                    />
                    {isOpenCollapse === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                  <Collapse in={isOpenCollapse === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subCategoryName.map((data, i) => (
                        <ListItemButton
                          onClick={() => {
                            navigate(`/categories/${item.categoryName}/${data}`)
                            navigate(0)
                          }}
                          sx={{
                            py: 0,
                            minHeight: 32,
                            color: "rgba(255,255,255,.8)",
                          }}
                        >
                          <ListItemText
                            primary={data}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: "medium",
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                  {/* {item.subCategory.map((sub, i) => (
                    <ListItemButton
                      sx={{
                        py: 0,
                        minHeight: 32,
                        color: "rgba(255,255,255,.8)",
                      }}
                    >
                      <ListItemText
                        primary={sub}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                  ))} */}
                </Box>
              );
            })}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

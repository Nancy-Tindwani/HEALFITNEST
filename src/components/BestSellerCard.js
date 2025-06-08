import { Button, Card, CardActions, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function BestSellerCard(props) {
    const navigate = useNavigate();

    return (
        <Card elevation={6} sx={{ minWidth: 540, borderRadius: '10px', margin: 2 }}>
            <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    alt=""
                    height="240"
                    image={props.image}
                    sx={{ position: 'relative' }}
                    label='Image'
                />
                <div style={{
                    position: "absolute",
                    top: 25,
                    left: "20px",
                    padding: '20px',
                    width: '45%',
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="card-content" style={{ marginBottom: '10px' }}>
                        <Typography variant="h4" sx={{ fontWeight: '600' }} color="text.secondary">
                            {props.text}
                        </Typography>
                    </div>
                    <CardActions>
                        <Button variant="outlined" onClick={() => {
                            if (props.id == 0) {
                                navigate('/categories/Ready To Eat/Fruits & Vegetables')
                            } else {
                                navigate('/categories/Personal Care')
                            }
                        }} sx={{
                            color: '#000',
                            border: '1px solid #000',
                            "&:hover": {
                                borderColor: '#000'
                            }
                        }}>Shop now</Button>
                    </CardActions>

                </div>
            </div>

        </Card>
    )
}
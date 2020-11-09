import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  Divider,
  CardContent,
  Typography,
} from '@material-ui/core';

interface PROPS_POST {
  displayName: string;
}

const PostItem: React.FC<PROPS_POST> = (props) => {
  const avatarIcon = props.displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <CardActionArea>
            <CardHeader
              avatar={<Avatar>{avatarIcon}</Avatar>}
              title={props.displayName}
            />
            <Divider />
            <CardContent>
              <Typography>
                This is a sample. Heat oil in a (14- to 16-inch) paella pan or a
                large, deep skillet over medium-high heat. Add chicken, shrimp
                and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                set aside, leaving chicken and chorizo in the pan. Add pimentón,
                bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                stirring often until thickened and fragrant, about 10 minutes.
                Add saffron broth and remaining 4 1/2 cups chicken broth; bring
                to a boil.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PostItem;

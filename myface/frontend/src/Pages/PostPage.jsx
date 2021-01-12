import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {
  Main,
  Header,
  MainFeaturedPost,
  FeaturedPost,
  Footer,
  Sidebar,
} from "../Components";

const PostPage = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Header />
        <div>these are the posts</div>
      </Container>
    </div>
  );
};

export default PostPage;

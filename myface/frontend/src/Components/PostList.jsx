import React, { useState, useEffect } from "react";

import * as postFunctions from "../GrabPost";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [pageURL, setPageURL] = useState("");

  useEffect(() => {
    async function getAllPosts() {
      let allPosts = await postFunctions.getPosts();
      console.log(allPosts);
      setPosts(allPosts);
    }
    getAllPosts();
  }, []);

  return <div>hahaha</div>;
};

export default PostList;

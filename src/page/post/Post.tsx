import { useEffect } from "react";

const PostPage = () => {

  useEffect(() => {
    console.log('get post');
  }, []);

  return (
    <div>
      post page
    </div>
  )
}

export default PostPage;
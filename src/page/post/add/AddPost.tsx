import React, { useState } from "react";

const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();

    alert('post')
  }

  return (
    <form>
      <div>
        <label>제목</label>
        <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>내용</label>
        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={handleAddPost}>저장</button>
      </div>
    </form>
  )
}

export default AddPostPage;
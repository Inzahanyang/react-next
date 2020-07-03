import React from "react";
import Link from "next/link";

export default (
  { postData } // 첫 번째 게시글 #해시태그 #해시태그
) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

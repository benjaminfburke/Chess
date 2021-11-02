import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const signIn = false;

  return (
    <div className="pl-3 pr-3 pt-2">
      {!signIn && (
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
}

export default Home;

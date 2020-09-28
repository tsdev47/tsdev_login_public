<h1>Back End Login/Register Form</h1>
<p>Built with Node.js and MongoDB</p>
<h2>Set up<h2>
<ol>
  <li>
    <h4>MongoDB connection</h4>
    <p>If there's not a cluster created for the App create new project and cluster on https://cloud.mongodb.com/</p>
  </li>
  <li>
    <h4>Update MongoDB connection string</h4>
    <p>Create a .env file on src with this content:
      <pre>
        MONGODB_URI='<YOUR_CONNECTION_STRING_HERE>/production?retryWrites=true&w=majority'
        TEST_MONGODB_URI='<YOUR_CONNECTION_STRING_HERE>/test?retryWrites=true&w=majority'
        DEV_MONGODB_URI='<YOUR_CONNECTION_STRING_HERE>/development?retryWrites=true&w=majority'
        PORT=3001
        SECRET=<YOUR_SECRET_WORD_TO_GENERATE_TOKEN>;
      </pre>
    </p>
  </li>
  <h2>Needed controllers on back end</h2>
  <ul>
    <li></li>
  </ul>
</ol>
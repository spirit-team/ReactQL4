// Client entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// Create browser history, for navigation a la single page apps
import createBrowserHistory from "history/createBrowserHistory";

// React, our UI engine
import * as React from "react";

// HOC for enabling Apollo GraphQL `<Query>` and `<Mutation>`
import { ApolloProvider } from "@apollo/client";

// Attach React to the browser DOM
import * as ReactDOM from "react-dom";

// Single page app routing
import { Router } from "react-router-dom";

/* Local */

// Our main component, and the starting point for server/browser loading
import Root from "@/components/root";

// Helper function that creates a new Apollo client per request
import { createClient } from "@/lib/apollo";

// ----------------------------------------------------------------------------

// Create Apollo client
const client = createClient();

// Create a browser history
const history = createBrowserHistory();

// Render
const root = document.getElementById("root")!;
ReactDOM[root.innerHTML ? "hydrate" : "render"](
  <ApolloProvider client={client}>
    <Router history={history}>
      <Root />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

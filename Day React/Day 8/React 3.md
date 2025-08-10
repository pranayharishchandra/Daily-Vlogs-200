# 1. Custom Hooks
A **custom hook** is a reusable JavaScript function whose name starts with `use` and that can call other React hooks like `useState` or `useEffect`. They are a core feature of React for sharing stateful logic between components without changing your component hierarchy.

### Why Use Custom Hooks?

Before custom hooks, sharing logic between components often required complex patterns like Higher-Order Components (HOCs) or Render Props, which could lead to "wrapper hell" (many nested components in the React DevTools).

Custom hooks solve this by letting you extract component logic into a simple, reusable function.

### How to Create a Custom Hook

1.  **Create a function whose name starts with `use`**. This naming convention is mandatory. 
> *It allows React to automatically check for violations of the Rules of Hooks.*
 2.   **Call other hooks inside it**. A custom hook can use ⭐`useState`, ⭐`useEffect`, ⭐`useContext`, or ⭐even other custom hooks.
3.  **Return what you need**. The hook can return a ⭐value, an ⭐array of values, ⭐an object, or a ⭐function that the component can then use.

-----

### Example: A `useDocumentTitle` Hook

Let's create a custom hook that updates the document's title. This is a common side effect that multiple components might need.

#### 1\. Create the Custom Hook

```javascript
// useDocumentTitle.js
import { useEffect } from 'react';

// The function name MUST start with "use"
function useDocumentTitle(title) {
  // This hook uses the built-in useEffect hook
  useEffect(() => {
    document.title = title;
    
    // Optional: Clean up function to reset the title when the component unmounts
    return () => {
      document.title = 'React App';
    };
  }, [title]); // Re-run the effect only if the title changes
}

export default useDocumentTitle;
```

#### 2\. Use the Custom Hook in Components

Now you can use this simple, one-line hook in any component to manage its document title.

```javascript
// HomePage.js
import useDocumentTitle from './useDocumentTitle';

function HomePage() {
  // Use the custom hook to set the document title
  useDocumentTitle('Welcome to Our Homepage');

  return <div>This is the home page.</div>;
}
```

```javascript
// ProfilePage.js
import useDocumentTitle from './useDocumentTitle';

function ProfilePage({ user }) {
  // The hook is reusable and can use props or state
  useDocumentTitle(`${user.name}'s Profile`);

  return <div>This is {user.name}'s profile.</div>;
}
```

### Key Benefits

  * **Reusability:** You write the logic once and can use it in any number of components.
  * **Clean Components:** It keeps your component code clean and focused on the UI, as the complex logic is extracted into the hook.
  * **Simplicity:** Custom hooks are much easier to write, read, and maintain than older patterns like HOCs.


  ---
  ---

## EXAMPLE ✨
Of course. Here is a simple and reusable `useToggle` custom hook that manages a boolean state.

### The `useToggle` Custom Hook

This hook will manage a boolean value and provide a function to toggle it. We'll use `useState` for the state and `useCallback` to memoize the toggle function for performance.

```javascript
// useToggle.js
import { useState, useCallback } from 'react';

/**
 * A custom hook to manage a boolean toggle state.
 * @param {boolean} initialValue - The initial state, defaults to false.
 * @returns {[boolean, function]} A tuple containing the current state and the toggle function.
 */
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  //⭐⭐useCallback ensures the toggle function isn't recreated on every render
  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  return [value, toggle];
}

export default useToggle;
```

-----

### How to Use It

You can import and use this hook in any component to easily manage on/off states, like showing/hiding elements, opening/closing modals, or toggling themes.

Here's an example of a component that shows and hides a piece of text.

```javascript
// ShowHideComponent.js
import useToggle from './useToggle';

function ShowHideComponent() {
  // Call the hook to get the state and the toggle function
  // It's just as easy to use as useState
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Text
      </button>

      {/* Conditionally render the text based on the isVisible state */}
      {isVisible && (
        <p style={{ marginTop: '1rem' }}>
          Here is the secret text! ✨
        </p>
      )}
    </div>
  );
}

export default ShowHideComponent;
```

### Benefits of this Custom Hook

  * **Reusability**: You can use this simple toggle logic in dozens of components without rewriting `useState` and the toggle logic every time.
  * **Clarity**: The code becomes more descriptive. `const [isOpen, toggleOpen] = useToggle()` immediately tells another developer what's happening, making your components easier to read.


---

# 2. useCallback
The `useCallback` hook is a tool to optimize your React components by returning a **memoized** version of a callback function. This means the function object itself is reused across renders instead of being recreated every time.

### Why Use `useCallback`?

In JavaScript, functions are objects. When a React component re-renders, any functions defined inside it are recreated as new objects.

```javascript
function MyComponent() {
  // On every render, this is a brand new function object.
  const handleClick = () => { console.log('Button clicked!'); };
  // ...
}
```

This is usually fine, but it becomes a problem when you pass that function as a prop to a child component that is optimized with **`React.memo`**. Because the prop is a "new" function every time, the optimized child will re-render unnecessarily, defeating the purpose of the optimization.

**`useCallback` solves this by giving you back the exact same function object from the previous render, unless its dependencies have changed.**

-----

### How It Works

The syntax is: `const memoizedFn = useCallback(fn, dependencies);`

  * `fn`: The function definition you want to memoize.
  * `dependencies`: An array of values. `useCallback` will only create a new function if one of these dependencies has changed.

#### Example

Here’s a common scenario showing the problem and the solution.

We have a `ParentComponent` with a counter. It renders a `MemoizedButton` component, which is wrapped in `React.memo` to prevent re-renders if its props don't change.

**1. The Memoized Child Component**

```javascript
import React from 'react';

// React.memo prevents this component from re-rendering if its props are the same.
const MemoizedButton = React.memo(function Button({ onClick }) {
  console.log("Button component re-rendered!");
  return <button onClick={onClick}>Click Me</button>;
});

export default MemoizedButton;
```

**2. Parent Without `useCallback` (The Problem)**

```javascript
import { useState } from 'react';
import MemoizedButton from './MemoizedButton';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // This function is recreated on every single render of ParentComponent.
  const handleButtonClick = () => {
    alert('Button was clicked!');
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <MemoizedButton onClick={handleButtonClick} />
    </div>
  );
}
```

In this version, every time you click "Increment Count," the parent re-renders. A new `handleButtonClick` function is created, and even though its code is identical, its reference is new. The `MemoizedButton` sees a new `onClick` prop and **re-renders unnecessarily**. You'll see "Button component re-rendered\!" in the console every time.

**3. Parent With `useCallback` (The Solution)**

```javascript
import { useState, useCallback } from 'react'; // Import useCallback
import MemoizedButton from './MemoizedButton';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // This function is now memoized. It will be the exact same function object
  // across re-renders because its dependency array [] is empty.
  const handleButtonClick = useCallback(() => {
    alert('Button was clicked!');
  }, []); // Dependencies go here

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <MemoizedButton onClick={handleButtonClick} />
    </div>
  );
}
```

Now, when you click "Increment Count," the parent re-renders, but `useCallback` returns the *exact same* function object for `handleButtonClick`. `React.memo` sees that the `onClick` prop has not changed and **prevents the button from re-rendering**. The console message will only appear once.

-----

### When to Use `useCallback`

`useCallback` is an **optimization tool**. Don't use it on every function. Use it when:

  * ## You are passing a callback to an "*optimized child component*" that uses `React.memo`.
  * Your function is a dependency in another hook's dependency array (e.g., `useEffect`), and you want to prevent the effect from running on every render.


---


# 3. ContextAPI

To allow a child component to change the context's value, you need to pass down both the **state value** and the **state setter function** through the provider.

The `value` prop of a context provider can hold any type of data, including an object. We'll pass an object containing both our `theme` state and the `setTheme` function.

-----

### Step 1: Update the Provider
Create the Context
First, you create a context object using `React.createContext()`. 
You can give it a default value, which is used if a component tries to consume the context without a provider.

`src/contexts/ThemeContext.js`

```JavaScript
import { createContext } from 'react';

// Create a context with a default value
export const ThemeContext = createContext('light');
```

### Step 2: Update the Provider

In `App.js`, we'll pass an object containing both `theme` and `setTheme` as the provider's value.

`src/App.js`

```javascript
import { useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import HomePage from './HomePage';

function App() {
  const [theme, setTheme] = useState('dark');

  // Create an object to pass both the theme and the function to update it
  const themeValue = {
    theme, // The current theme (e.g., 'dark')
    toggleTheme: () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    // Pass the entire object as the context value
    <ThemeContext.Provider value={themeValue}>
      <HomePage />
    </ThemeContext.Provider>
  );
}

export default App;
```

> **Note:** We created a `toggleTheme` function for convenience. You could also just pass `setTheme` directly.

-----

### Step 3: Update the Consumer to Use the Function

Now, any child component can consume the context to get both the theme and the function to change it. Let's create a dedicated button for this.

`src/components/ThemeToggleButton.js`

```javascript
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemeToggleButton() {
  // Destructure the theme and toggleTheme function from the context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{ margin: '20px' }}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}

export default ThemeToggleButton;
```

-----

### Tying It All Together

Your `HomePage` component might look like this, using both the theme for styling and including the toggle button.

`src/HomePage.js`

```javascript
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';

function HomePage() {
  // We still consume the context here to get the theme for styling
  const { theme } = useContext(ThemeContext);

  const pageStyle = {
    height: '100vh',
    width: '100vw',
    backgroundColor: theme === 'dark' ? '#282c34' : '#f9f9f9',
    color: theme === 'dark' ? 'white' : 'black',
    textAlign: 'center',
    transition: 'all 0.3s',
  };

  return (
    <div style={pageStyle}>
      <h1>Welcome to the App!</h1>
      <p>The current theme is {theme}.</p>
      <ThemeToggleButton />
    </div>
  );
}

export default HomePage;
```

Now, when you click the button, it calls the `toggleTheme` function from the context. This function calls `setTheme` back in the `App` component, which updates the state. React then re-renders all components consuming the `ThemeContext` with the new theme value.

> ### (Central Library i.e. `createContext`) -> (parent component i.e. `App.js` i.e. implmenting FUNCTIONALITY and `Provider` to children components)
> ### (`useContext` Button i.e. SKELETON to use the FUNCTOINALITY ) -> (now use the Button (Skeleton + functionality))

---

# 4. React Router


First, a quick clarification: the current stable and widely-used version is **React Router v6**. Version 7 is not out yet, but the concepts from v6 are the foundation for React's future, so mastering them is key.

React Router allows you to match a URL in the browser to a specific component in your app, enabling navigation between different pages in a single-page application (SPA).

-----

### Core Concepts

Here are the essential building blocks you'll use:

  * **`BrowserRouter`**: A component that wraps your entire app, providing it with routing capabilities.
  * **`Routes` & `Route`**: Used to define which component should render for a specific URL path.
  * **`Link`**: A component to create navigation links (like an `<a>` tag, but it prevents full-page reloads).
  * **`Outlet`**: A placeholder used in a parent route's component (like a layout or navbar) to render the matching child route.
  * **`useParams`**: A hook to access dynamic parts of the URL (e.g., a user ID like `/users/123`).
  * **`useNavigate`**: A hook for navigating programmatically (e.g., after a form submission).

-----

### Example: A Simple User Profile App

We'll build an app with a homepage, an about page, a list of users, and a detailed profile page for each user.

#### Step 1: Installation & Setup

First, install React Router in your project.

```bash
npm install react-router-dom
```

Next, wrap your entire application with `BrowserRouter` in your main entry file.

`src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

#### Step 2: Create a Shared Layout and Page Components

A common pattern is to have a shared layout (like a navigation bar) that stays on the screen while the page content changes. The **`<Outlet />`** component is perfect for this.

`src/Layout.jsx`

```jsx
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid', paddingBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/about">About</Link>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        {/* This is the placeholder where child routes will be rendered */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
```

Now, let's create our simple page components.

`src/pages/HomePage.jsx`

```jsx
export default function HomePage() { return <h2>Welcome to the Home Page!</h2>; }
```

`src/pages/AboutPage.jsx`

```jsx
export default function AboutPage() { return <h2>This is the About Page.</h2>; }
```

`src/pages/UsersPage.jsx`

```jsx
import { Link } from 'react-router-dom';

export default function UsersPage() {
  // A dummy list of users
  const users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ];

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Step 3: Define Your Routes

In your `App.jsx`, you'll define the URL paths and which components they should render using `<Routes>` and `<Route>`. We'll nest our page routes inside the `Layout` route.

`src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UsersPage from './pages/UsersPage';
// We will create these two components next
import UserProfile from './pages/UserProfile';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* This is the parent route using the Layout */}
      {/* All pages will now share the Layout component */}
      <Route path="/" element={<Layout />}>
        {/* The index route renders at the parent's path ("/") */}
        {/* These are the child routes. They will render inside the <Outlet /> */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="users" element={<UsersPage />} />
        
        {/* This is a dynamic route for individual user profiles */}
        <Route path="users/:userId" element={<UserProfile />} />

        {/* This "catch-all" route handles 404s */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
```

#### Step 4: Handle Dynamic Routes and 404s

Now, let's create the components for the dynamic user profile page and the not-found page.

To get the user's ID from the URL (`/users/123`), we use the **`useParams`** hook.

`src/pages/UserProfile.jsx`

```jsx
import { useParams, Link } from 'react-router-dom';

export default function UserProfile() {
  // The 'userId' name comes from the route path: "users/:userId"
  const { userId } = useParams();

  return (
    <div>
      <h2>User Profile Page</h2>
      <p>Viewing profile for User ID: <strong>{userId}</strong></p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
}
```

The `NotFoundPage` can use the **`useNavigate`** hook to programmatically send the user back home.

`src/pages/NotFoundPage.jsx`

```jsx
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - Page Not Found!</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')}>Go Back Home</button>
    </div>
  );
}
```

![image.png](https://assets.leetcode.com/users/images/9bc9495f-ada6-49dc-b617-5df8c009a78f_1754832733.5915258.png)



---

# 5. Link vs useNavigate"

> - ## `<Link>`: `<Link to="/"> Home </Link>`, when you just tell clicking this text will take you to some page
> - ## `useNavigate`: when you want navigate from a `condition` i.e `programatically`  Eg: onClick, notValidUser

You use `<Link>` for navigation that the **user initiates by clicking**, and you use `useNavigate` for navigation that the **application initiates programmatically**.

Think of it like this:

  * **`<Link>` 🔗**: It's a signpost. The user sees it and decides to click it to go somewhere.
  * **`useNavigate()` 🤖**: It's a GPS. The application decides to reroute you automatically based on an event or a condition.

-----

### The `<Link>` Component (User-Driven Navigation)

You should use `<Link>` whenever you want to render a standard, clickable navigation element that the user can see and interact with. It renders an `<a>` tag in your HTML.

**When to use `<Link>`:**

  * **Navigation Bars:** Your main site navigation (`Home`, `About`, `Contact`).
  * **Inline Links:** Clicking a user's name in a comment to go to their profile.
  * **"Read More" Buttons:** Linking from a blog summary to the full post.

Basically, if you can see it and click it to go to a new page, it should be a `<Link>`.

#### Example

```jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About Us</Link>
    </nav>
  );
}
```

-----

### The `useNavigate` Hook (Programmatic Navigation)

You use the `useNavigate` hook when you need to redirect the user based on code logic, not a direct click on a link. This is for situations where the navigation is a *consequence* of an action.

**When to use `useNavigate`:**

1.  **After Form Submission:** The most common use case. After a user successfully logs in, you programmatically send them to their dashboard.
2.  **After an Action is Completed:** A user clicks a "Delete Post" button. After the API call confirms the deletion, you navigate them away from the now non-existent page.
3.  **Conditional Redirects:** A component checks if a user is logged in. If not, it immediately redirects them to the `/login` page without the user clicking anything.
4.  **Time-Based Redirects:** Showing a success message and then redirecting after a few seconds.

#### Example

Here's a typical login form scenario. The user isn't clicking a "Go to Dashboard" link; the app sends them there after their credentials are verified.

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would verify credentials with a server
    const loginSuccessful = (username === 'admin');

    if (loginSuccessful) {
      // If login is successful, navigate to the dashboard ➡️
      navigate('/dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

-----

### Summary

| Feature | `<Link>` | `useNavigate()` |
| :--- | :--- | :--- |
| **What is it?** | A component that renders an `<a>` tag. | A hook that gives you a function. |
| **Trigger** | The **user** clicks on the rendered element. | The **application** calls the function. |
| **Nature** | **Declarative** (You declare what the UI should look like). | **Imperative** (You command the app to perform an action). |
| **Use Case** | Visible navigation elements like menus and buttons. | Redirecting after actions, form submissions, or logic checks. |





----

# 6. NavLink
You're right, my bad\! We've covered the standard link, but we missed its very useful sibling. Let's fix that.

### `<NavLink>`: The "Smart" Link

Think of **`<NavLink>`** as a special version of `<Link>` that **knows when it is "active"**.

It's designed specifically for building navigation menus. It lets you apply special styling to the link that points to the current page, so the user can easily see where they are in the app.

-----

### The Big Difference: `isActive`

The magic of `<NavLink>` is that its `style` and `className` props can accept a **function**. This function receives an object with a boolean property called `isActive`.

  * `isActive` is `true` if the link's `to` prop matches the current URL.
  * `isActive` is `false` otherwise.

You can use this to conditionally apply styles or CSS classes.

-----

### How to Use It 🎨

Let's build a navigation bar. We want the link for the current page to be **bold and red**.

`src/components/Navbar.jsx`

```jsx [-style]
import { NavLink } from 'react-router-dom';

function Navbar() {
  // This is the style we want to apply to the active link
  const activeStyle = {
    fontWeight: 'bold',
    color: 'red',
    textDecoration: 'underline',
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem' }}>
      <NavLink 
        to="/" 
        style={({ isActive }) => isActive ? activeStyle : undefined}
      >
        Home
      </NavLink>

      <NavLink 
        to="/users" 
        style={({ isActive }) => isActive ? activeStyle : undefined}
      >
        Users
      </NavLink>

      <NavLink 
        to="/about"
        style={({ isActive }) => isActive ? activeStyle : undefined}
      >
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
```
```js [-classname]
import { NavLink } from 'react-router-dom';
import './styles.css';

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => 
          isActive ? "nav-link active-link" : "nav-link"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        About
      </NavLink>
    </nav>
  );
}
```

**How it works:**

  * When you are on the homepage (`/`), the "Home" `NavLink`'s `isActive` will be `true`, so it gets the `activeStyle`. The other links will have `isActive: false`.
  * When you navigate to `/users`, the "Users" `NavLink` becomes active and gets the special styling, while the "Home" link goes back to normal.

-----

### `<Link>` vs. `<NavLink>`: A Quick Summary

| Feature | `<Link>` | `<NavLink>` |
| :--- | :--- | :--- |
| **Core Purpose** | A basic link to navigate between routes. | A special link that knows when it's active. |
| **"Active" State** | Does **not** know if it matches the current URL. | **Knows** if it matches the current URL via the `isActive` prop. |
| **Primary Use Case** | All general-purpose links (e.g., linking to a profile, a "Read More" button). | Main navigation menus (`Navbar`, `Sidebar`) where you need to highlight the current page 📍. |

**Rule of thumb:**

  * For your main navigation menu? Use **`<NavLink>`**.
  * For pretty much every other link in your app? Use **`<Link>`**.



![image.png](https://assets.leetcode.com/users/images/409d7841-0db0-43b2-97d0-7158ce5c6dcf_1754835790.3100598.png)





























# 1. Prefix route
```jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

// Define the components for each dashboard page
const DashboardOverview = () => <h4>Dashboard Overview</h4>;
const ProfilePage = () => <h4>Your Profile</h4>;
const SettingsPage = () => <h4>Account Settings</h4>;

function App() {
  return (
    <Routes>
      {/* Other top-level routes like a homepage could be here */}
      <Route path="/" element={<h2>Home Page</h2>} />

      {/* 📂 This is the parent route defining the "/dashboard" prefix */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* The index route renders at "/dashboard" */}
        <Route index element={<DashboardOverview />} />
        
        {/* This route renders at "/dashboard/profile" */}
        <Route path="profile" element={<ProfilePage />} />
        
        {/* This route renders at "/dashboard/settings" */}
        <Route path="settings" element={<SettingsPage />} />

      </Route>
    </Routes>
  );
}
export default App;
```



---
# 2. Dynamic Routing
**Dynamic routing** creates flexible URL paths by using placeholders, called **URL parameters**, instead of static text. This allows you to use a single route to render a component for a whole category of pages, like user profiles, product details, or blog posts, where only a specific ID or **slug** changes in the URL.

For example, instead of creating separate routes for `/users/alice`, `/users/bob`, and `/users/charlie`, you create one dynamic route: `/users/:userId`.

-----

### How It Works

Dynamic routing involves two main steps:

1.  **Define the Dynamic Route**: In your route configuration, you add a colon (`:`) before a segment in the path to mark it as a dynamic parameter.
2.  **Access the Parameter**: In the component rendered by that route, you use the `useParams` hook from React Router to get the actual value from the URL.

#### Analogy: Mail Delivery 📬

Think of a mail carrier.

  * **Static Path (`/users`)**: This is the street name. The carrier knows how to get to "Users Street".
  * **Dynamic Parameter (`:userId`)**: This is the house number. It changes for each delivery.
  * **React Router**: This is the mail carrier.
  * **`useParams()`**: This is the carrier reading the house number off the envelope to know which door to go to.

-----

### Example: Building a User Profile Page

Let's set up a list of users, where clicking a user's name takes you to their unique profile page.


```jsx []
import { Link } from 'react-router-dom';

const users = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
  { id: 'charlie', name: 'Charlie' }
];

function UsersListPage() {
  return (
    <div>
      <h2>Select a User</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {/* The link points to a dynamic URL */}
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UsersListPage;
```


```jsx []
import { useParams } from 'react-router-dom';

function UserProfile() {
  // Use the useParams hook to get the dynamic part of the URL
  // The key 'userId' MUST match the parameter name in the route path
  const { userId } = useParams();

  return (
    <div>
      <h2>User Profile 🆔</h2>
      <p>Currently viewing the profile for user: <strong>{userId}</strong></p>
    </div>
  );
}
export default UserProfile;
```



```jsx []
import { Routes, Route } from 'react-router-dom';
import UsersListPage from './pages/UsersListPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="/users" element={<UsersListPage />} />

      {/* 🛣️ This is the dynamic route. */}
      {/* It will match /users/alice, /users/bob, etc. */}
      <Route path="/users/:userId" element={<UserProfile />} />
    </Routes>
  );
}
export default App;
```

Now, when a user clicks the "Alice" link, the URL becomes `/users/alice`. React Router matches this to the `path="/users/:userId"` route, renders the `UserProfile` component, and the `useParams` hook provides `{ userId: 'alice' }` to that component.





---

# 3. Optional Segment
An **optional segment** in React Router is a part of the URL path that may or may not be present for the route to match. You create one by adding a question mark (`?`) to the end of a URL parameter.

For example, the path `/inbox/:messageId?` will match both `/inbox` and `/inbox/123`.

This is useful when you want one component to handle both a general view (like a list) and a specific item view (like a selected item from that list) without creating two separate routes.

-----

### How It Works

When you define a route with an optional segment, the `useParams` hook behaves as follows:

  * If the optional part is in the URL (e.g., `/inbox/123`), `useParams` will return an object with the parameter (`{ messageId: '123' }`).
  * If the optional part is **not** in the URL (e.g., `/inbox`), `useParams` will return an object where the parameter's value is `undefined` (`{ messageId: undefined }`).

Your component can then use this information to render its UI conditionally.

-----

### Example: An Email Inbox ✉️

```jsx []
import { useParams, Link } from 'react-router-dom';

const messages = [
  { id: '1', title: 'Hello World', content: 'This is the first message.' },
  { id: '2', title: 'React Router', content: 'Optional segments are cool.' },
];

function Inbox() {
  const { messageId } = useParams();
  const selectedMessage = messages.find(msg => msg.id === messageId);

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <h3>Inbox</h3>
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              <Link to={`/inbox/${msg.id}`}>{msg.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Message</h3>
        {/* Render content based on whether messageId exists */}
        {selectedMessage ? (
          <article>
            <h4>{selectedMessage.title}</h4>
            <p>{selectedMessage.content}</p>
          </article>
        ) : (
          <p>Please select a message.</p>
        )}
      </div>
    </div>
  );
}

export default Inbox;
```



```jsx []
import { Routes, Route, Link } from 'react-router-dom';
import Inbox from './Inbox';

function App() {
  return (
    <div>
      <nav>
        <Link to="/inbox">Go to Inbox</Link>
      </nav>
      <hr />
      <Routes>
        {/* 👇 This single route handles both /inbox and /inbox/:messageId */}
        <Route path="/inbox/:messageId?" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default App;
```

**What happens:**

  * **When you visit `/inbox`**: `messageId` is `undefined`. The component shows the list and the "Please select a message" prompt.
  * **When you click a link and visit `/inbox/2`**: `messageId` is `"2"`. The component finds the selected message and displays its content alongside the list.



---

# 4. NavLink and Active class
### Video with time stamp : 10:21:49
https://youtu.be/LuNPCSNr-nE?t=37269

---

# 5. 
 




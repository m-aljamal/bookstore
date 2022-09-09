import Button from "components/Button";
import { Container } from "components/Container";
import { AuthPageProps, User } from "lib/types";
import React from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import BookScreen from "./BookScreen";
import DiscoverBooksScreen from "./DiscoverBooksScreen";
import NotFound from "./NotFound";

const AuthPage = ({ user, logout }: AuthPageProps) => {
  return (
    <Container>
      <div className="flex  justify-end items-center space-x-5 mt-8">
        <p>{user.name}</p>
        <Button onClick={logout}>Logout</Button>
      </div>

      <div className="relative mt-10 ">
        <Nav />
      </div>
      <main className="w-full">
        <AppRoutes user={user} />
      </main>
    </Container>
  );
};

export default AuthPage;

const Nav = () => {
  return (
    <nav>
      <Container>
        <ul>
          <li>
            <NavLink to="/discover">Discover</NavLink>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const match = useMatch(to);
  return <Link to={to}>{children}</Link>;
};

const AppRoutes = ({ user }: { user: User }) => {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverBooksScreen user={user} />} />
      <Route path="/book/:bookId" element={<BookScreen user={user} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

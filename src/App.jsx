import * as React from "react";
import { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import business_logo from "./assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "./services/firebase";
import { useNavigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "lenders",
    title: "Lenders",
    icon: <PermContactCalendarIcon />,
  },
];

const BRANDING = {
  title: "Jeff Software Solutions",
  logo: <img src={business_logo} alt="Jeff Software Solutions Logo" />,
  homeUrl: "/",
};

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setSession({
          user: {
            name: user.displayName || "User",
            email: user.email || "",
            image: user.photoURL ? (
              <img src={user.photoURL} alt="User Avatar" />
            ) : (
              <AccountCircleIcon />
            ),
          },
        });
        setShowModal(false); // Close modal when user is authenticated
      } else {
        setUser(null);
        setSession(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [session, setSession] = React.useState({});

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setShowModal(true);
      },
      signOut: async () => {
        await auth.signOut();
        setUser(null);
        setSession(null);
        navigate("/");
      },
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={authentication}
    >
      <Outlet />
      <Register isOpen={showModal} onClose={closeModal} />
    </ReactRouterAppProvider>
  );
}

import axios from "axios";
 
export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    // Making the API call with 'withCredentials' flag
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/register`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,  // Ensure credentials (like cookies) are sent
    });

    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};









export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/me`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/posts`, {
      withCredentials: true,
    });

    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/my/posts`, {
      withCredentials: true, 
    });

    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response ? error.response.data.message : error.message, // Handle cases where response is undefined
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/users?name=${name}`, {
        withCredentials: true, 
      });

      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/logout`, {
      withCredentials: true, // Include cookies with the request
    });

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};


export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/v1/update/profile`,
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include this if authentication is needed
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log for debugging
    dispatch({
      type: "updateProfileFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/v1/update/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include this if authentication is needed
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.error("Error updating password:", error); // Log for debugging
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/delete/me`, {
      withCredentials: true, // Include this if authentication is needed
    });

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.error("Error deleting profile:", error); // Log for debugging
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/v1/forgot/password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include this if authentication is needed
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.error("Error during forgot password:", error); // Log for debugging
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/v1/password/reset/${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include if authentication is needed
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.error("Error during password reset:", error); // Log for debugging
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/userposts/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/follow/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

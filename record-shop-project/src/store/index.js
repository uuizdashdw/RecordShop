import {
  fetchDeleteUserAccount,
  fetchUser,
  fetchUserSignUp,
  updateUserPassword,
  updateUserPersonalInfo,
} from "@/pages/api";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialStateProduct = {
  products: [],
};

const initialStateCarts = {
  carts: [],
};

const initialUsers = {
  users: [],
  userInfo: null,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialStateProduct,
  reducers: {
    updateProducts(state, action) {
      state.products = action.payload;
    },
  },
});

const cartSlide = createSlice({
  name: "carts",
  initialState: initialStateCarts,
  reducers: {
    setInitialCarts(state, action) {
      state.carts = action.payload;
    },
    addToCarts(state, action) {
      // 동일 아이템 확인
      const existingItem = state.carts.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // 새로운 아이템 추가
        const newItem = {
          id: state.carts.length + 1, // 새로운 아이템의 ID
          name: action.payload.name, // action.payload에서 이름 가져오기
          price: action.payload.priceOff
            ? Number(
                (action.payload.aboutItem?.quntityInfo.price)
                  .match(/\d+/g)
                  .join("")
              )
            : action.payload.price,
          imageUrl: action.payload.imageUrl,
          quantity: 1, // 새로운 아이템 수량 1
          quantityTerm: action.payload.quantityTerms,
        };
        state.carts.push(newItem); // 새로운 아이템 추가
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    changeCartItemQuantity(state, action) {
      const { name, quantity } = action.payload;

      const updatedCarts = state.carts.map((item) => {
        if (item.name === name) return { ...item, quantity };
        return item;
      });

      state.carts = updatedCarts;

      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },

    removeCartsItem(state, action) {
      const updatedCarts = state.carts.filter(
        (item) => item.id !== action.payload.id
      );

      state.carts = updatedCarts;
      localStorage.setItem("carts", JSON.stringify(updatedCarts));
    },
    clearCarts(state) {
      state.carts = [];
      localStorage.setItem("carts", JSON.stringify([]));
    },
  },
});

const usersSlide = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signout: (state) => {
      state.users = initialUsers.users;
      state.userInfo = null;
      localStorage.removeItem("user");
    },

    deleteId: (state) => {
      state.userInfo = null;

      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      // ------------------------ 회원가입 ------------------------
      .addCase(fetchUserSignUp.fulfilled, (state, action) => {
        state.userInfo.push(action.payload);
      })
      // ------------------------ 사용자 정보 설정 ------------------------
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.users.push(action.payload);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // ------------------------ 비밀번호 변경 ------------------------
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
      // ------------------------ 개인정보 변경 ------------------------
      .addCase(updateUserPersonalInfo.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(updateUserPersonalInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // ------------------------ 회원탈퇴 ------------------------
      .addCase(fetchDeleteUserAccount.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDeleteUserAccount.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.userInfo = null;
        localStorage.removeItem("user");
      })
      .addCase(fetchDeleteUserAccount.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    carts: cartSlide.reducer,
    users: usersSlide.reducer,
  },
});

export const { updateProducts } = productSlice.actions;
export const {
  addToCarts,
  removeCartsItem,
  clearCarts,
  changeCartItemQuantity,
  setInitialCarts,
} = cartSlide.actions;

export const { setUserInfo, signout, deleteId } = usersSlide.actions;

export default store;

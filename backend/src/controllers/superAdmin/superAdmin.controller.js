const Admin = require("../../models/adminAndAnalytics/admin.model");
const Store = require("../../models/storeAndWarehouse/store.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");
const bcrypt = require("bcrypt");


exports.createStore = async (req, res, next) => {
  try {
    const {
      name,
      description,
      phone,
      email,
      address,
      logo,
      bannerImage,
      geolocation,
    } = req.body;
    const ALLOWED_FIELDS = [
      "name",
      "description",
      "phone",
      "email",
      "address",
      "logo",
      "bannerImage",
      "geolocation",
    ];
    const isFieldsValid = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isFieldsValid) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    if (!name || !description || !phone || !email || !address) {
      throw new ApiError(400, "All fields are required");
    }
    const isStoreExists = await Store.findOne({
      $or: [{ name: name }, { phone: phone }, { email: email }],
    });
    if (isStoreExists) {
      throw new ApiError(
        400,
        "Store with this name or phone or email already exists"
      );
    }
    const isAddressExists = await Store.findOne({ address: address });
    if (isAddressExists) {
      throw new ApiError(400, "Store with this address already exists");
    }
    const store = new Store({
      name,
      description,
      phone,
      email,
      address,
      logo,
      bannerImage,
      geolocation,
    });
    await store.save();
    const response = new ApiResponse(200, "Store created successfully", {
      storeId: store._id,
      name: store.name,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { email, name, phone, store,  password } = req.body;
    const ALLOWED_FIELDS = [
      "email",
      "name",
      "phone",
      "store",
      "password",
    ];
    const isAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isAllowed) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    if (!email || !name || !phone || !store || !password) {
      throw new ApiError(400, "All fields are required");
    }
    const storeExists = await Store.findById(store);
    if (!storeExists) {
      throw new ApiError(404, "Store not found");
    }
    const isAdminExists = await Admin.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (isAdminExists) {
      throw new ApiError(400, "Admin with this email or phone already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      name,
      phone,
      store,
      password: passwordHash,
    });
    await newAdmin.save();

    const response = new ApiResponse(201, "Admin created successfully", {
      adminId: newAdmin._id,
      email: newAdmin.email,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};



// Super Admin Controllers
exports.getAllStores = async (req, res, next) => {};
exports.getStoreById = async (req, res, next) => {};
exports.updateStore = async (req, res, next) => {};
exports.deleteStore = async (req, res, next) => {};
exports.getAllAdmins = async (req, res, next) => {};
exports.getAdminById = async (req, res, next) => {};
exports.updateAdmin = async (req, res, next) => {};
exports.deleteAdmin = async (req, res, next) => {};

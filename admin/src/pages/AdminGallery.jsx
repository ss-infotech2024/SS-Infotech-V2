import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Eye,
  ImagePlus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { PageHeader } from "../components/ui/kit";

import axios from "axios";
import { message } from "../components/ui/toast";
import { confirmDialog } from "../components/ui/confirm";


/*
|--------------------------------------------------------------------------
| Focus Trap
|--------------------------------------------------------------------------
*/

const useFocusTrap = (ref, isOpen) => {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const element = ref.current;

    const focusableElements =
      element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    const firstFocusable =
      focusableElements[0];

    const lastFocusable =
      focusableElements[
        focusableElements.length - 1
      ];

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (
          document.activeElement ===
          firstFocusable
        ) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (
          document.activeElement ===
          lastFocusable
        ) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener(
      "keydown",
      handleKeyDown
    );

    firstFocusable?.focus();

    return () => {
      element.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [ref, isOpen]);
};


/*
|--------------------------------------------------------------------------
| Admin Gallery
|--------------------------------------------------------------------------
*/

const AdminGallery = () => {
  /*
  |--------------------------------------------------------------------------
  | Album State
  |--------------------------------------------------------------------------
  */

  const [albums, setAlbums] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    fullTitle: "",
    color: "",
    images: [],
  });

  const [gradientType, setGradientType] = useState("3");

  const [gradientColors, setGradientColors] = useState([
    {
      color: "#FF9933",
      position: 0,
    },
    {
      color: "#FFFFFF",
      position: 50,
    },
    {
      color: "#138808",
      position: 100,
    },
  ]);

  const [gradientDirection, setGradientDirection] =
    useState("90");

  const [isEditing, setIsEditing] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [viewAlbum, setViewAlbum] =
    useState(null);

  const [
    currentImageIndex,
    setCurrentImageIndex,
  ] = useState(0);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Photo Management State
  |--------------------------------------------------------------------------
  */

  const [
    manageAlbum,
    setManageAlbum,
  ] = useState(null);

  const [
    selectedPhotoIndex,
    setSelectedPhotoIndex,
  ] = useState(null);

  const [
    isReplacing,
    setIsReplacing,
  ] = useState(false);

  const [
    isAddingPhotos,
    setIsAddingPhotos,
  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Refs
  |--------------------------------------------------------------------------
  */

  const formRef = useRef(null);

  const fileInputRef =
    useRef(null);

  const photoInputRef =
    useRef(null);

  const replaceInputRef =
    useRef(null);

  const modalRef =
    useRef(null);

  const photoModalRef =
    useRef(null);


  /*
  |--------------------------------------------------------------------------
  | Fetch Albums
  |--------------------------------------------------------------------------
  */

  const fetchAlbums = async () => {
    try {
      const response =
        await axios.get(
          "/api/albums/album-getall"
        );

      setAlbums(response.data);
    } catch (err) {
      message.error(
        "Failed to load albums. Please try again."
      );
    }
  };


  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
      const gradient =
        generateGradientCSS();

      setFormData((prev) => ({
        ...prev,
        color: gradient,
      }));
    }, [
      gradientType,
      gradientColors,
      gradientDirection,
    ]);
  


  /*
  |--------------------------------------------------------------------------
  | ESC - Album Viewer
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleEscape = (e) => {
      if (
        e.key === "Escape" &&
        viewAlbum
      ) {
        closeModal();
      }
    };

    if (viewAlbum) {
      document.addEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        "unset";
    };
  }, [viewAlbum]);


  /*
  |--------------------------------------------------------------------------
  | Keyboard Navigation
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleKey = (e) => {
      if (!viewAlbum) return;

      if (e.key === "ArrowLeft") {
        prevImage();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    if (viewAlbum) {
      document.addEventListener(
        "keydown",
        handleKey
      );

      return () =>
        document.removeEventListener(
          "keydown",
          handleKey
        );
    }
  }, [
    viewAlbum,
    currentImageIndex,
  ]);


  /*
  |--------------------------------------------------------------------------
  | Focus Traps
  |--------------------------------------------------------------------------
  */

  useFocusTrap(
    modalRef,
    !!viewAlbum
  );

  useFocusTrap(
    photoModalRef,
    !!manageAlbum
  );


  /*
  |--------------------------------------------------------------------------
  | Album Form Input
  |--------------------------------------------------------------------------
  */

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const updateGradientColor = (index, value) => {
  setGradientColors((prev) =>
    prev.map((item, i) =>
      i === index
        ? {
            ...item,
            color: value,
          }
        : item
    )
  );
};


const updateGradientPosition = (
  index,
  value
) => {
  const position = Math.min(
    100,
    Math.max(0, Number(value))
  );

  setGradientColors((prev) =>
    prev.map((item, i) =>
      i === index
        ? {
            ...item,
            position,
          }
        : item
    )
  );
};


const getActiveGradientColors = () => {
  return gradientColors.slice(
    0,
    Number(gradientType)
  );
};


const generateGradientCSS = () => {
  const colors =
    getActiveGradientColors();

  if (colors.length === 1) {
    return colors[0].color;
  }

  const stops = colors
    .map(
      (item) =>
        `${item.color} ${item.position}%`
    )
    .join(", ");

  return `linear-gradient(${gradientDirection}deg, ${stops})`;
};


const generateGradientTailwind = () => {
  const colors =
    getActiveGradientColors();

  if (colors.length === 1) {
    return "bg-[#" +
      colors[0].color.replace("#", "") +
      "]";
  }

  return generateGradientCSS();
};


const applyGradientToForm = () => {
  const gradient =
    generateGradientCSS();

  setFormData((prev) => ({
    ...prev,
    color: gradient,
  }));
};


  /*
  |--------------------------------------------------------------------------
  | Album File Change
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (e) => {
    const files = Array.from(
      e.target.files
    );

    if (files.length > 10) {
      setError(
        "Maximum 10 images allowed"
      );

      message.error(
        "Maximum 10 images allowed"
      );

      return;
    }

    if (
      !isEditing &&
      files.length < 5
    ) {
      setError(
        "Minimum 5 images required for new albums"
      );

      message.error(
        "Minimum 5 images required for new albums"
      );

      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    setError("");
  };


  /*
  |--------------------------------------------------------------------------
  | Create / Update Album
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append(
      "title",
      formData.title
    );

    data.append(
      "fullTitle",
      formData.fullTitle
    );

    data.append(
      "color",
      formData.color
    );

    formData.images.forEach(
      (file) => {
        data.append(
          "images",
          file
        );
      }
    );

    try {
      if (isEditing) {
        const response =
          await axios.patch(
            `/api/albums/album/${editId}`,
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setAlbums((prev) =>
          prev.map((album) =>
            album._id === editId
              ? response.data.album
              : album
          )
        );

        message.success(
          "Album updated successfully!"
        );
      } else {
        const response =
          await axios.post(
            "/api/albums/album-post",
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setAlbums((prev) => [
          response.data.album,
          ...prev,
        ]);

        message.success(
          "Album created successfully!"
        );
      }

      resetAlbumForm();
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        "Failed to save album";

      setError(errMsg);
      message.error(errMsg);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Reset Album Form
  |--------------------------------------------------------------------------
  */

  const resetAlbumForm = () => {
    setFormData({
      title: "",
      fullTitle: "",
      color: "",
      images: [],
    });

    setIsEditing(false);
    setEditId(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Edit Album
  |--------------------------------------------------------------------------
  */

  const handleEdit = (album) => {
    setIsEditing(true);

    setEditId(album._id);

    setFormData({
      title: album.title,
      fullTitle: album.fullTitle,
      color: album.color,
      images: [],
    });

    setError("");

    message.info(
      `Editing album: ${album.title}`
    );

    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };


  /*
  |--------------------------------------------------------------------------
  | Delete Album
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (_id) => {
    if (
      !(await confirmDialog({ title: "Delete this album?", description: "The album and all of its photos will be permanently removed from the website.", confirmText: "Delete album" }))
    ) {
      return;
    }

    try {
      await axios.delete(
        `/api/albums/album/${_id}`
      );

      setAlbums((prev) =>
        prev.filter(
          (album) =>
            album._id !== _id
        )
      );

      if (
        manageAlbum?._id === _id
      ) {
        setManageAlbum(null);
      }

      message.success(
        "Album deleted successfully!"
      );
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        "Failed to delete album";

      setError(errMsg);

      message.error(errMsg);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Open Album Viewer
  |--------------------------------------------------------------------------
  */

  const openModal = (
    album,
    index = 0
  ) => {
    setViewAlbum(album);
    setCurrentImageIndex(index);
  };


  const closeModal = () => {
    setViewAlbum(null);
    setCurrentImageIndex(0);
  };


  /*
  |--------------------------------------------------------------------------
  | Viewer Navigation
  |--------------------------------------------------------------------------
  */

  const nextImage = () => {
    if (
      !viewAlbum ||
      !viewAlbum.images.length
    ) {
      return;
    }

    setCurrentImageIndex(
      (i) =>
        (i + 1) %
        viewAlbum.images.length
    );
  };


  const prevImage = () => {
    if (
      !viewAlbum ||
      !viewAlbum.images.length
    ) {
      return;
    }

    setCurrentImageIndex(
      (i) =>
        (i -
          1 +
          viewAlbum.images.length) %
        viewAlbum.images.length
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Open Photo Manager
  |--------------------------------------------------------------------------
  */

  const openPhotoManager = (
    album
  ) => {
    setManageAlbum(album);

    setSelectedPhotoIndex(
      null
    );

    setIsReplacing(false);
    setIsAddingPhotos(false);
  };


  const closePhotoManager = () => {
    setManageAlbum(null);

    setSelectedPhotoIndex(
      null
    );

    setIsReplacing(false);
    setIsAddingPhotos(false);

    if (photoInputRef.current) {
      photoInputRef.current.value =
        "";
    }

    if (
      replaceInputRef.current
    ) {
      replaceInputRef.current.value =
        "";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Add Photos
  |--------------------------------------------------------------------------
  */

  const handleAddPhotos = async (
    e
  ) => {
    const files = Array.from(
      e.target.files
    );

    if (!files.length) {
      return;
    }

    const currentCount =
      manageAlbum.images.length;

    if (
      currentCount +
        files.length >
      10
    ) {
      message.error(
        `Maximum 10 photos allowed. You currently have ${currentCount}.`
      );

      return;
    }

    const data = new FormData();

    files.forEach((file) => {
      data.append(
        "images",
        file
      );
    });

    try {
      setIsAddingPhotos(true);

      const response =
        await axios.post(
          `/api/albums/album/${manageAlbum._id}/images`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const updatedAlbum =
        response.data.album;

      setManageAlbum(
        updatedAlbum
      );

      setAlbums((prev) =>
        prev.map((album) =>
          album._id ===
          updatedAlbum._id
            ? updatedAlbum
            : album
        )
      );

      message.success(
        "Photos added successfully!"
      );
    } catch (err) {
      message.error(
        err.response?.data?.error ||
          "Failed to add photos"
      );
    } finally {
      setIsAddingPhotos(false);

      if (photoInputRef.current) {
        photoInputRef.current.value =
          "";
      }
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Replace Photo
  |--------------------------------------------------------------------------
  */

  const handleReplacePhoto = async (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (
      !file ||
      selectedPhotoIndex === null
    ) {
      return;
    }

    const data = new FormData();

    data.append(
      "image",
      file
    );

    try {
      setIsReplacing(true);

      const response =
        await axios.patch(
          `/api/albums/album/${manageAlbum._id}/images/${selectedPhotoIndex}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const updatedAlbum =
        response.data.album;

      setManageAlbum(
        updatedAlbum
      );

      setAlbums((prev) =>
        prev.map((album) =>
          album._id ===
          updatedAlbum._id
            ? updatedAlbum
            : album
        )
      );

      message.success(
        "Photo replaced successfully!"
      );
    } catch (err) {
      message.error(
        err.response?.data?.error ||
          "Failed to replace photo"
      );
    } finally {
      setIsReplacing(false);
      setSelectedPhotoIndex(
        null
      );

      if (
        replaceInputRef.current
      ) {
        replaceInputRef.current.value =
          "";
      }
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Delete Individual Photo
  |--------------------------------------------------------------------------
  */

  const handleDeletePhoto = async (
    index
  ) => {
    if (
      !(await confirmDialog({ title: "Delete this photo?", description: "The photo will be removed from the album. This can't be undone.", confirmText: "Delete photo" }))
    ) {
      return;
    }

    try {
      const response =
        await axios.delete(
          `/api/albums/album/${manageAlbum._id}/images/${index}`
        );

      const updatedAlbum =
        response.data.album;

      setManageAlbum(
        updatedAlbum
      );

      setAlbums((prev) =>
        prev.map((album) =>
          album._id ===
          updatedAlbum._id
            ? updatedAlbum
            : album
        )
      );

      /*
       * Update viewer if open
       */

      if (
        viewAlbum?._id ===
        updatedAlbum._id
      ) {
        setViewAlbum(
          updatedAlbum
        );

        if (
          currentImageIndex >=
          updatedAlbum.images.length
        ) {
          setCurrentImageIndex(
            Math.max(
              0,
              updatedAlbum.images.length -
                1
            )
          );
        }
      }

      message.success(
        "Photo deleted successfully!"
      );
    } catch (err) {
      message.error(
        err.response?.data?.error ||
          "Failed to delete photo"
      );
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Overlay Click
  |--------------------------------------------------------------------------
  */

  const handleOverlayClick = (
    e
  ) => {
    if (
      e.target ===
      e.currentTarget
    ) {
      closeModal();
    }
  };


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-0">

      <main className="page">
        <PageHeader
          icon={Images}
          eyebrow="Website"
          title="Gallery"
          description="Create albums of 5–10 photos, style their cover gradient, and manage individual photos."
        />


        {/* ================================================================
            CREATE / EDIT ALBUM
        ================================================================= */}

        <section
          ref={formRef}
          className="card card-pad"
        >

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">
                {isEditing
                  ? "Update Album"
                  : "Create New Album"}
              </h2>

              <p className="card-subtitle">
                {isEditing
                  ? "Update album information or add photos."
                  : "Create an album with 5–10 photos."}
              </p>
            </div>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}

            {/* Album Basic Information + Images */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Title */}
              <div>
                <label className="label">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              {/* Full Title */}
              <div>
                <label className="label">
                  Full Title
                </label>

                <input
                  type="text"
                  name="fullTitle"
                  value={formData.fullTitle}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>

              {/* Images */}
              <div>
                <label className="label">
                  {isEditing ? "Add Images" : "Images (5–10)"}
                </label>

                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="input py-2 text-xs file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#7c3aed]/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#6d28d9]"
                  required={!isEditing}
                />
              </div>

            </div>


            {/* Color */}

         {/* ================================================================
                GRADIENT BUILDER
            ================================================================= */}

            <div>

              <div className="flex items-center justify-between mb-4">

                <div>
                  <label className="block text-sm font-bold text-ink">
                    Album Color / Gradient
                  </label>

                  <p className="mt-1 text-xs text-ink-muted">
                    Choose 1, 2 or 3 colors and control their positions.
                  </p>
                </div>

              </div>


              {/* ================================================================
                  COLOR COUNT
              ================================================================= */}

              <div className="flex flex-wrap items-end gap-4 mb-4">

                {/* Number of Colors */}
                <div>
                  <label className="label">
                    Colors
                  </label>

                  <div className="flex gap-1">
                    {["1", "2", "3"].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGradientType(count)}
                        className={`h-9 min-w-[2.5rem] rounded-xl border px-3 text-xs font-bold transition ${
                          gradientType === count
                            ? "bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white border-transparent shadow-glow-sm"
                            : "bg-white/80 text-ink-soft border-[#e2dcf2] hover:bg-white"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direction */}
                {gradientType !== "1" && (
                  <div>
                    <label className="label">
                      Direction
                    </label>

                    <select
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value)}
                      className="select w-44 py-2 text-xs"
                    >
                      <option value="0">Top → Bottom</option>
                      <option value="45">Diagonal ↗</option>
                      <option value="90">Left → Right</option>
                      <option value="135">Diagonal ↘</option>
                      <option value="180">Bottom → Top</option>
                      <option value="270">Right → Left</option>
                    </select>
                  </div>
                )}

              </div>


              {/* ================================================================
                  COLOR CONTROLS
              ================================================================= */}

              <div className="flex flex-wrap items-center gap-3">

                {getActiveGradientColors().map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-3 py-2 shadow-sm"
                  >

                    {/* Color Number */}
                    <span className="whitespace-nowrap text-xs font-bold text-ink-muted">
                      C{index + 1}
                    </span>

                    {/* Color Picker */}
                    <input
                      type="color"
                      value={item.color}
                      onChange={(e) =>
                        updateGradientColor(index, e.target.value)
                      }
                      className="h-8 w-8 cursor-pointer rounded-lg border border-[#e2dcf2] bg-white p-0.5"
                    />

                    {/* HEX */}
                    <input
                      type="text"
                      value={item.color}
                      onChange={(e) =>
                        updateGradientColor(index, e.target.value)
                      }
                      className="input w-24 px-2 py-1.5 text-xs font-semibold uppercase"
                    />

                    {/* Position */}
                    {gradientType !== "1" && (
                      <>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.position}
                          onChange={(e) =>
                            updateGradientPosition(
                              index,
                              e.target.value
                            )
                          }
                          className="input w-16 px-2 py-1.5 text-center text-xs"
                        />

                        <span className="text-xs text-ink-muted">
                          %
                        </span>
                      </>
                    )}

                  </div>
                ))}

              </div>


              {/* ================================================================
                  LIVE PREVIEW
              ================================================================= */}

              {/* Live Preview + CSS Output */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                {/* Live Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-ink">
                      Live Preview
                    </p>

                    <span className="badge-success text-[10px]">
                      ● Live
                    </span>
                  </div>

                  <div
                    className="h-20 w-full rounded-2xl border border-white shadow-inner ring-1 ring-black/5"
                    style={{
                      background: generateGradientCSS(),
                    }}
                  />
                </div>

                {/* Generated CSS */}
                <div>
                  <p className="mb-2 text-xs font-semibold text-ink">
                    Generated CSS
                  </p>

                  <div className="flex h-20 items-center overflow-auto break-all rounded-2xl bg-[#1d1736] px-3 py-2 font-mono text-xs text-[#c4b5fd]">
                    {generateGradientCSS()}
                  </div>
                </div>

              </div>


              {/* ================================================================
                  GENERATED VALUE
              ================================================================= */}

              <div className="mt-4">

                <p className="label">
                  Generated CSS
                </p>

                <div className="break-all rounded-2xl bg-[#1d1736] p-3 font-mono text-xs text-[#c4b5fd] sm:text-sm">
                  {generateGradientCSS()}
                </div>

              </div>


              {/* ================================================================
                  SAVE COLOR
              ================================================================= */}

              <button
                type="button"
                onClick={applyGradientToForm}
                className="btn-secondary mt-4"
              >
                Apply Gradient
              </button>


              {/* Current saved value */}

              {formData.color && (

                <div className="mt-3">

                  <p className="mb-1 text-xs text-ink-muted">
                    Value that will be saved:
                  </p>

                  <p className="break-all rounded-xl bg-[#7c3aed]/[0.06] p-3 font-mono text-xs text-[#4c1d95]">
                    {formData.color}
                  </p>

                </div>

              )}

            </div>


            {/* Images */}

            {/* <div>
              <label className="label">
                {isEditing
                  ? "Add Images"
                  : "Images (5–10)"}
              </label>

              <input
                type="file"
                name="images"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleFileChange
                }
                ref={fileInputRef}
                className="w-full p-3 border border-gray-300 rounded-xl"
                required={
                  !isEditing
                }
              />
            </div> */}


            {error && (
              <p className="field-error text-sm">
                {error}
              </p>
            )}


            <div className="flex gap-3">

              <button
                type="submit"
                className="btn-primary btn-lg"
              >
                {isEditing
                  ? "Update Album"
                  : "Create Album"}
              </button>


              {isEditing && (
                <button
                  type="button"
                  onClick={
                    resetAlbumForm
                  }
                  className="btn-secondary btn-lg"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </section>


        {/* ================================================================
            ALBUM LIST
        ================================================================= */}

        <section className="card card-pad">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink">
                Albums
              </h2>

              <p className="card-subtitle">
                Manage albums and individual photos.
              </p>
            </div>

            <span className="badge-violet px-3 py-1 text-xs">
              {albums.length} Albums
            </span>

          </div>


          {albums.length === 0 ? (
            <p className="text-ink-muted">
              No albums found.
            </p>
          ) : (

            <div className="table-wrap">

              <table className="table-ui">

                <thead >

                  <tr>

                    <th >
                      Album
                    </th>

                    <th >
                      Full Title
                    </th>

                    <th >
                      Images
                    </th>

                    <th >
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody >

                  {albums.map(
                    (album) => (

                      <tr
                        key={
                          album._id
                        }
                        
                      >

                        {/* Album */}

                        <td >

                          <div className="flex items-center gap-4">

                            <div className="h-14 w-14 overflow-hidden rounded-xl bg-[#ece7f8] ring-1 ring-black/5">

                              {album.images?.[0] && (
                                <img
                                  src={
                                    album.images[0]
                                  }
                                  alt={
                                    album.title
                                  }
                                  className="w-full h-full object-cover"
                                />
                              )}

                            </div>

                            <div>

                              <p className="font-semibold text-ink">
                                {
                                  album.title
                                }
                              </p>

                              <p className="text-xs text-ink-muted">
                                ID:{" "}
                                {
                                  album._id
                                }
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Full Title */}

                        <td className="text-ink-muted">
                          {
                            album.fullTitle
                          }
                        </td>


                        {/* Images */}

                        <td >

                          <span className="badge-violet">
                            {
                              album.images
                                ?.length ||
                              0
                            }{" "}
                            Photos
                          </span>

                        </td>


                        {/* Actions */}

                        <td >

                          <div className="flex flex-wrap gap-2">

                            <button
                              onClick={() =>
                                openModal(
                                  album
                                )
                              }
                              type="button"
                              aria-label={`View ${album.title}`}
                              data-tooltip="View album"
                              className="btn-ghost btn-sm"
                            >
                              <Eye size={16}/>
                            </button>


                            <button
                              onClick={() =>
                                openPhotoManager(
                                  album
                                )
                              }
                              type="button"
                              aria-label={`Manage photos in ${album.title}`}
                              data-tooltip="Add or remove photos"
                              className="btn-secondary btn-sm"
                            >
                              <ImagePlus size={16} />
                            </button>


                            <button
                              onClick={() =>
                                handleEdit(
                                  album
                                )
                              }
                              type="button"
                              aria-label={`Edit ${album.title}`}
                              data-tooltip="Edit album details"
                              className="btn-ghost btn-sm"
                            >
                              <Pencil size={16} />
                            </button>


                            <button
                              onClick={() =>
                                handleDelete(
                                  album._id
                                )
                              }
                              type="button"
                              aria-label={`Delete ${album.title}`}
                              data-tooltip="Delete album"
                              className="btn-danger-soft btn-sm"
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>


      {/* ================================================================
          PHOTO MANAGEMENT MODAL
      ================================================================= */}

      <AnimatePresence>

        {manageAlbum && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b0b33]/40 p-2 backdrop-blur-sm sm:p-4"
          >

            <motion.div
              ref={
                photoModalRef
              }
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              className="glass-strong w-full max-w-7xl max-h-[95vh] overflow-hidden rounded-[28px] font-ui"
            >

              {/* Header */}

              <div className="flex items-center justify-between gap-3 border-b border-[#ebe6f7] p-5 sm:p-6">

                <div>

                  <h2 className="text-xl font-extrabold tracking-tight text-ink">
                    Manage Photos
                  </h2>

                  <p className="mt-1 text-sm text-ink-muted">
                    {
                      manageAlbum.fullTitle
                    }
                  </p>

                </div>


                <div className="flex items-center gap-3">

                  <span className="badge-violet px-3 py-1.5 text-xs">
                    {
                      manageAlbum
                        .images
                        .length
                    }
                    /10 Photos
                  </span>


                  <button
                    onClick={
                      closePhotoManager
                    }
                    className="icon-btn h-10 w-10 rounded-full bg-white/80 shadow-sm"
                  >
                    ✕
                  </button>

                </div>

              </div>


              {/* Content */}

              <div className="max-h-[calc(95vh-100px)] overflow-y-auto p-5 sm:p-6">

                {/* Top Controls */}

                <div className="flex flex-wrap gap-3 mb-6">

                  <label className="cursor-pointer">

                    <input
                      ref={
                        photoInputRef
                      }
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handleAddPhotos
                      }
                      className="hidden"
                      disabled={
                        isAddingPhotos ||
                        manageAlbum
                          .images
                          .length >=
                          10
                      }
                    />

                    <span
                      className={`btn ${
                        manageAlbum
                          .images
                          .length >=
                        10
                          ? "cursor-not-allowed bg-[#d9d3e8] text-white"
                          : "cursor-pointer bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white shadow-glow-sm hover:-translate-y-px"
                      }`}
                    >
                      {isAddingPhotos
                        ? "Adding..."
                        : "+ Add Photos"}
                    </span>

                  </label>


                  <div className="flex items-center text-sm text-ink-muted">
                    Maximum 10 photos per album
                  </div>

                </div>


                {/* ======================================================
                    Photo Grid
                ======================================================= */}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

                  {manageAlbum.images.map(
                    (
                      image,
                      index
                    ) => (

                      <motion.div
                        key={`${image}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm transition duration-300 hover:shadow-glass-lg"
                      >

                        {/* Image */}

                        <button
                          type="button"
                          onClick={() =>
                            openModal(
                              manageAlbum,
                              index
                            )
                          }
                          className="block w-full"
                        >

                          <img
                            src={image}
                            alt={`Photo ${
                              index + 1
                            }`}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                          />

                        </button>


                        {/* Number */}

                        <div className="absolute top-2 left-2">

                          <span className="rounded-lg bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                            #
                            {index +
                              1}
                          </span>

                        </div>


                        {/* Actions */}

                        <div className="p-3">

                          <div className="flex gap-2">

                            {/* Replace */}

                            <label className="flex-1 cursor-pointer">

                              <input
                                ref={
                                  selectedPhotoIndex ===
                                  index
                                    ? replaceInputRef
                                    : null
                                }
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={
                                  handleReplacePhoto
                                }
                                onClick={() =>
                                  setSelectedPhotoIndex(
                                    index
                                  )
                                }
                                className="hidden"
                              />

                              <span className="btn-secondary btn-sm">
                                Replace
                              </span>

                            </label>


                            {/* Delete */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDeletePhoto(
                                  index
                                )
                              }
                              className="btn-danger-soft btn-sm flex-1"
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      </motion.div>

                    )
                  )}

                </div>


                {/* Empty */}

                {manageAlbum.images
                  .length === 0 && (

                  <div className="text-center py-20">

                    <div className="text-5xl mb-4">
                      🖼️
                    </div>

                    <h3 className="text-lg font-bold text-ink">
                      No photos
                    </h3>

                    <p className="mt-2 text-ink-muted">
                      Add photos to this album.
                    </p>

                  </div>

                )}


                {/* ======================================================
                    LIVE PREVIEW
                ======================================================= */}

                <div className="mt-10 border-t border-[#ebe6f7] pt-8">

                  <div className="flex items-center justify-between mb-5">

                    <div>

                      <h3 className="text-lg font-extrabold tracking-tight text-ink">
                        Live Album Preview
                      </h3>

                      <p className="text-sm text-ink-muted">
                        This is how the current album photos will appear.
                      </p>

                    </div>


                    <button
                      onClick={() =>
                        openModal(
                          manageAlbum,
                          0
                        )
                      }
                      className="btn-primary btn-sm"
                    >
                      Open Full Preview
                    </button>

                  </div>


                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {manageAlbum.images
                      .slice(0, 4)
                      .map(
                        (
                          image,
                          index
                        ) => (

                          <button
                            key={image}
                            type="button"
                            onClick={() =>
                              openModal(
                                manageAlbum,
                                index
                              )
                            }
                            className="relative aspect-video rounded-2xl overflow-hidden group"
                          >

                            <img
                              src={image}
                              alt={`Preview ${
                                index +
                                1
                              }`}
                              className="w-full h-full object-cover group-hover:scale-105 transition"
                            />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

                          </button>

                        )
                      )}

                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ================================================================
          FULL ALBUM VIEWER
      ================================================================= */}

      <AnimatePresence>

        {viewAlbum && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0d0618]/85 p-4 backdrop-blur-md"
            onClick={
              handleOverlayClick
            }
          >

            <motion.div
              ref={modalRef}
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              className="glass-strong relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-[28px] font-ui"
            >

              {/* Header */}

              <div className="flex items-center justify-between gap-3 border-b border-[#ebe6f7] p-5">

                <div>

                  <h3 className="text-lg font-extrabold tracking-tight text-ink">
                    {
                      viewAlbum.fullTitle
                    }
                  </h3>

                  <p className="text-sm text-ink-muted">
                    Photo{" "}
                    {currentImageIndex +
                      1}{" "}
                    of{" "}
                    {
                      viewAlbum
                        .images
                        .length
                    }
                  </p>

                </div>


                <button
                  onClick={
                    closeModal
                  }
                  className="icon-btn"
                >
                  ✕
                </button>

              </div>


              {/* Image */}

              <div className="p-6">

                <div className="relative overflow-hidden rounded-2xl bg-[#ece7f8]">

                  <motion.img
                    key={
                      currentImageIndex
                    }
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    src={
                      viewAlbum
                        .images[
                        currentImageIndex
                      ]
                    }
                    alt="album"
                    className="w-full h-[65vh] object-contain"
                  />


                  {/* Previous */}

                  <button
                    onClick={
                      prevImage
                    }
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-ink shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
                  >
                    ‹
                  </button>


                  {/* Next */}

                  <button
                    onClick={
                      nextImage
                    }
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-ink shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
                  >
                    ›
                  </button>

                </div>


                {/* Thumbnails */}

                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">

                  {viewAlbum.images.map(
                    (
                      image,
                      index
                    ) => (

                      <button
                        key={`${image}-${index}`}
                        onClick={() =>
                          setCurrentImageIndex(
                            index
                          )
                        }
                        className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                          currentImageIndex ===
                          index
                            ? "border-[#8b5cf6] ring-4 ring-[#8b5cf6]/20"
                            : "border-transparent"
                        }`}
                      >

                        <img
                          src={image}
                          alt={`Thumbnail ${
                            index +
                            1
                          }`}
                          className="w-full h-full object-cover"
                        />

                      </button>

                    )
                  )}

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default AdminGallery;
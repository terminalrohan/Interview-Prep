import React, { useEffect, useState } from "react";
import { LuPlus, LuCheck } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Loader/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.SESSION.DELETE(sessionData._id)
      );
      if (response.data) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md bg-white shadow-lg rounded-full pointer-events-auto flex items-center gap-2 py-3 px-4`}
            >
              <div className="text-green-500">
                <LuCheck className="w-[18px] h-[18px]" />
              </div>
              <p className="text-[14px] text-gray-700 font-normal">
                Session Deleted Successfully
              </p>
            </div>
          ),
          {
            position: "top-center",
            duration: 2000,
          }
        );
        fetchAllSessions();
        setOpenDeleteAlert({ open: false, data: null });
      }
    } catch (error) {
      toast.error("Failed to delete session");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const handleCardSelect = (sessionId) => {
    navigate(`/interview-prep/${sessionId}`);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert({ open: false, data: null });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => handleCardSelect(data?._id)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-[#FF9324] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={handleCloseDeleteAlert}
      >
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium">Delete Alert</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this session detail?
            </p>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              onClick={handleCloseDeleteAlert}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF9324] rounded hover:bg-[#e67f15]"
              onClick={() => deleteSession(openDeleteAlert.data)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;

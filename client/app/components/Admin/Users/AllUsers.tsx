import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@/components/ui/button';
import { AiOutlineDelete } from "react-icons/ai";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Mail, Pencil } from 'lucide-react';
import { useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import Loader from '@/components/loader';
import { format } from "timeago.js"
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';

type Props = {};

const AllUsers = (props: Props) => {
    const { isLoading, error, isSuccess, data } = useGetAllUsersQuery({});
    const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

    // Toggle between light and dark mode
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const columns = [
        { field: "id", headerName: "_id", flex: 0.3 },
        { field: "title", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.5 },
        { field: "role", headerName: "Role", flex: 0.5 },
        { field: "courses", headerName: "Purchased Items", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
        {
            field: " ", headerName: "Mail", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button asChild>
                        <a
                        href={`mailto:${params.row.email}`}>
                            <Mail/>
                            </a>
                            </Button>
                    </>
                );
            }
        },
        {
            field: "delete", headerName: "Delete", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete />
                        </Button>
                    </>
                );
            }
        },
    ];
    const rows: any = [];

    {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                email:item.email,
                role:item.role,
                courses:item.courses.length,
                created_at: format(item.createdAt)
            })
        })
    }


    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light', // Toggle between dark and light mode
            background: {
                default: isDarkMode ? '#121212' : '#fff',
            },
            text: {
                primary: isDarkMode ? '#fff' : '#000', // Set primary text color to white in dark mode
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="mt-[70px]">
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <Box
                            m="20px"
                            height="100%"
                            sx={{
                                backgroundColor: isDarkMode ? '#121212' : '#fff', // Background color of the container
                                color: isDarkMode ? '#fff' : '#000', // Text color inside the box
                                borderRadius: '8px', // Optional: Adding border-radius to the box
                            }}
                        >
                            <Box
                                m="40px 0 0 0"
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                        outline: "none",
                                        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', // Grid background color
                                        color: isDarkMode ? '#fff' : '#000', // Text color in grid cells
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: isDarkMode ? '#333' : '#f5f5f5', // Header background
                                        color: isDarkMode ? '#fff' : '#000', // Header text color
                                    },
                                    "& .MuiDataGrid-row": {
                                        backgroundColor: isDarkMode ? '#333' : '#fff', // Row background color
                                        "&:hover": {
                                            backgroundColor: isDarkMode ? '#444' : '#f5f5f5', // Hover effect on row
                                        },
                                    },
                                    "& .MuiDataGrid-cell": {
                                        color: isDarkMode ? '#fff' : '#000', // Cell text color
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: isDarkMode ? '#fff' : '#000', // Checkbox color
                                    },
                                }}
                            />
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                    )
                }

            </div>
        </ThemeProvider>
    );
};

export default AllUsers;

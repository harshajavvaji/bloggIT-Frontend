import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import DeleteBlogModal from '../DeleteBlogModal/DeleteBlogModal'

const BlogsTable = ({ blogs, setIsUpdate, isUpdate, setBlog, setReload }) => {
    const [user, setUser] = React.useState({})
    const navigate = useNavigate()
    const [isDisplayDelete, setIsDisplayDelete] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [navigate])

    const openDeleteModal = (id) => {
        if(!isDisplayDelete){
            setSelectedBlogId(id)
            setIsDisplayDelete(true)
        }
        
      }
      const closeDeleteModal = () => {
        setSelectedBlogId(null)
        setIsDisplayDelete(false)
      }
    const handleUpdate =(blog)=>{
        setIsUpdate(true)
        setBlog(blog)
    }
    // const[isUpdate, setIsUpdate] = useState(false)
    
    return (
        <div
            className="container-fluid"
            style={{ border: "1px solid #ddd", margin: "12px" }}
        >
            <table class="table">
                <thead>
                    <tr>
                        <th style={{ fontWeight: "200" }} scope="col">
                            Title
                        </th>
                        <th style={{ fontWeight: "200" }} scope="col">
                            Description
                        </th>
                        <th style={{ fontWeight: "200" }} scope="col">
                            Image
                        </th>
                        {/* <th style={{ fontWeight: "200" }} scope="col">
              Start Date
            </th> */}
                        <th style={{ fontWeight: "200" }} scope="col">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => (
                        <tr key={blog?._id} style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
                            <td
                                style={{
                                    fontWeight: "bold",
                                    fontFamily: "sans-serif",
                                    padding: "16px",
                                }}
                            >
                                <div className="d-flex align-items-start">
                                    <div>
                                        {/* <FaUserLarge /> */}
                                    </div>
                                    <div>{blog?.title}</div>
                                </div>
                            </td>
                            <td style={{ padding: "16px" }}>{blog?.description}</td>
                            <td style={{ padding: "16px" }}>
                                <img className='rounded-circle' style={{ width: "100px", height: "100px" }} src={blog?.image ? blog?.image : "NO IMAGE"} alt="" />
                            </td>
                            {/* <td style={{ padding: "16px" }}>{customer.startDate}</td> */}
                            {/* <td style={{ padding: "16px" }}>
                <div
                  className="text-center"
                  style={{
                    ...getStyleByStatus(customer.status),
                    width: "60px",
                    height: "20px",
                    borderRadius: "20px",
                  }}
                >
                  {customer.status}
                </div>
              </td> */}
                            <td style={{ padding: "16px" }}>
                                <div className="d-flex gap-2">
                                    <Link to={`/blog/${blog?._id}`}>
                                        <button className="btn btn-primary btn-sm">View</button>
                                    </Link>
                                    {console.log("userId", localStorage.getItem('user')?._id, 'this user', blog?.userId)}
                                    {blog?.userId === user?._id && <button onClick={() => { handleUpdate(blog) }} className="btn btn-secondary btn-sm">Edit</button>}
                                    {blog?.userId === user?._id && <button className="btn btn-danger btn-sm" onClick={() => {openDeleteModal(blog?._id)}}>Delete</button>}

                                    {/* <Link>
                    <CiEdit onClick={() => openEditModal(customer)} style={{ color: "black" }} />
                  </Link>
                  <Link>
                    <MdDeleteOutline onClick={() => openDeleteModal(customer)} style={{ color: "red" }} />
                  </Link> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {/* {isDisplayEdit && <EditCustomerModal customer={selectedCustomer} closeEditModal={closeEditModal} />} */}
      {isDisplayDelete && <DeleteBlogModal id={selectedBlogId} closeDeleteModal={closeDeleteModal} setReload={setReload} />}
        </div>
    )
}

export default BlogsTable

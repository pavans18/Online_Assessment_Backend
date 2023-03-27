import style from "./Subject.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects, deleteSubjectByName, addSubject } from "../../../../store/slices/SubjectSlice";


function Subject() {


    const [name, setName] = useState("");

    const dispatch = useDispatch();


    //  ---------------------- add Subject & close buttton fuctions  -------------------------------------
    const [display, setDisplay] = useState({
        display: "none"
    });

    function handleAddSubject() {
        setDisplay({ display: "block" });
    }

    function handleCloseAdd() {
        setDisplay({ display: "none" });
    }


    // --------------------Adding Subject And re-render subject component-----------------

    function handleInput(e) {
        setValues({
            name: e.target.value
        });

    }


    const [values, setValues] = useState({ name: "" });

    const handleAddingNewSubject = (e) => {
        dispatch(addSubject({ values }))
        setValues({ name: "" });

    }


    // --------------- Fetching all subjects from database -------------------------

    const { post, isLoading } = useSelector((state) => ({ ...state.subjects }));


    useEffect(() => {

        dispatch(getAllSubjects())
        setName("")
    }, [dispatch, name])

    if (isLoading) {
        return <div>Loading Subjects ....</div>
    }


    // ------------------------Deleting Subject and reload component------------------------------

    const handleDeleteButton = (name) => {
        console.log(name);
        setName(name);
        dispatch(deleteSubjectByName(name))
    };


    // -----------------------if no subjects available condition--------------------------------

    if (post.length === 0) return (
        <>
            <div id={style.content}>

                <div id={style.displayHeadingBox}>
                    <h2>No Subject Available</h2>
                </div>

                <div id={style.addSubjectBox}>
                    <button onClick={handleAddSubject}>Add Subject</button>
                </div>

                {/* Add Subject */}


                <div id={style.addBox} style={display} >
                    <label htmlFor="">Enter Subject: </label>
                    <input onChange={(e) => handleInput(e)} type="text" placeholder="Enter Subject name" />

                    <div id={style.buttonBox}>
                        <button onClick={handleAddingNewSubject}  >Add</button>
                        <button onClick={handleCloseAdd} >Close</button>
                    </div>
                </div>

            </div>
        </>
    );

    return (
        <>

            <div id={style.content}>

                <div id={style.displayHeadingBox}>
                    <h2>Subject List</h2>
                </div>

                <div id={style.tableBox}>
                    <table  >
                        <thead>
                            <tr>
                                <th id={style.center}>Subject Name</th>
                                <th id={style.center}>Options</th>
                            </tr>
                        </thead>
                        <tbody id={style.tbody}>
                            {
                                post.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{data.name}</td>
                                            <td><button onClick={() => handleDeleteButton(data.name)}>Delete</button></td>
                                        </tr>
                                    );

                                })
                            }


                        </tbody>
                    </table>
                </div>

                <div id={style.addSubjectBox}>
                    <button onClick={handleAddSubject}>Add Subject</button>
                </div>

                {/* ---------- Add Subject Component ------------- */}


                <div id={style.addBox} style={display} >
                    <label htmlFor="">Enter Subject: </label>
                    <input onChange={(e) => handleInput(e)} type="text" placeholder="Enter Subject name" />

                    <div id={style.buttonBox}>
                        <button onClick={handleAddingNewSubject}  >Add</button>
                        <button onClick={handleCloseAdd} >Close</button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Subject;
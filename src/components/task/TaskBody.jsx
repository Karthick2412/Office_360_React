import './TaskBodyStyle.css'
import { useState ,useRef,useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Axios from 'axios';
import config from '../../configurations/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Tasks() {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    const headerconfig = {
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem("token")
      }
    };
    Axios.get(config.apiUrl+"projects/byuserid/"+localStorage.getItem("user"),headerconfig).then(function (res){
      setProjectList(res.data.data);
    })
  }, []);
  
  const [startDate, setStartDate] = useState(new Date());

  const DescriptionText=useRef();

  const selectedOption=useRef();

  const taskFromTime=useRef();

  const taskToTime=useRef();
  

 

  // State to store the current value of the range slider
  const [sliderValue, setSliderValue] = useState(50); // Initial value of 50
  
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  // Function to handle changes in the slider value
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
  const notifyUser = () => {
    console.log("NotifyUser Called")
    toast.success('Successfully added!', {
      position: "top-right",
    });
  };

  const TaskSubmissionHandler = (event)=>{
    setButtonDisabled(true);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    const formattedDate =`${year}-${month}-${day}`;
    var Task={
      date :formattedDate,
      projectId:selectedOption.current.value,
      description:DescriptionText.current.value,
      statusPercentage:sliderValue,
      taskFromTime:taskFromTime.current.value,
      taskToTime:taskToTime.current.value,
      userId:localStorage.getItem("user")
    }
    const headerconfig = {
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem("token")
      }
    };
    Axios.post(config.apiUrl+"tasks/new",Task,headerconfig).then(function (res){
      if(res.status===200){
        setStartDate(new Date());
        DescriptionText.current.value=''
        taskFromTime.current.value=''
        taskToTime.current.value=''
        setButtonDisabled(false);
        notifyUser();
        
      }
    })
  }

  return <>
  <ToastContainer />
    <div className="card taskBody">
      <div className="card-header">
        Task Details
      </div>
      <div className="card-body">
        <form className='formBody'>
          <div className="form-group row">
            <label htmlFor="DateInput" className="col-sm-2 col-form-label mb-2">Date</label>
            <div className="col-sm-3">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                formatDate='yyyy/MM/dd'
                className='form-control'
                id="DateInput"
              />
            </div>
          </div>
          <div className="form-group row">
          <label htmlFor="dropdown" className="col-sm-2 col-form-label">Project</label>
          <div className="col-sm-6">
          <select id="dropdown" className="form-control" ref={selectedOption}>
            {projectList.map((item,index)=>(
              <option key={item.projectId} value={item.projectId}>{item.title}</option>
            ))}
          </select>
          </div>
          </div>
          <div className="form-group row">
            
            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="description" placeholder="Description.." ref={DescriptionText} />
            </div>
          </div>

          <div className="form-group row">
            
            <label htmlFor="statusrange" className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-6">
              
              <input type="range" className="form-control" id="statusrange"  min="0" max="100" value={sliderValue} onChange={handleSliderChange} />
            </div>
            <p>{sliderValue}%</p>
          </div>

          <div className="form-group row">
            
            <label htmlFor="timerange" className="col-sm-2 col-form-label">Time</label>
            <div className="col-sm-3">
            <input type="text" className="form-control timepick" id="timerange-from" ref={taskFromTime} placeholder="From" />
            </div>
            <div className="col-sm-3">
            <input type="text" className="form-control timepick" id="timerange-to" ref={taskToTime} placeholder="To" />
            </div>

          </div>

          <div className="form-group row mx-2">

            <button type="button" className="btn btn-outline-secondary col-sm-1 mx-5" onClick={TaskSubmissionHandler} disabled={isButtonDisabled}>{isButtonDisabled?'Adding...':'Add Task'}</button>

          </div>
        </form>
      </div>
    </div>
  </>
}

export default Tasks;
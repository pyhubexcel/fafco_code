import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';



export default function CustomButton({ buttonName, type,loading }) {
  return (
    <div>
      {/* <Button type={type} className='w-full' variant="contained">{buttonName}  </Button> */}
      <LoadingButton type={type} className='w-full' loading={loading} variant="contained">{buttonName}</LoadingButton>
    </div>
  )
}

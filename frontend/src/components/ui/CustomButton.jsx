import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';



export default function CustomButton({ buttonName, type,loading,onClick, buttonIcon,variant }) {
  return (
    <div>
      {/* <Button type={type} className='w-full' variant="contained">{buttonName}  </Button> */}
      <LoadingButton type={type} className='w-full' loading={loading} variant={variant} onClick={onClick}>{buttonIcon}{buttonName}</LoadingButton>
    </div>
  )
}

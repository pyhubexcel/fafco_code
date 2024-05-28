import LoadingButton from '@mui/lab/LoadingButton';



// eslint-disable-next-line react/prop-types
export default function CustomButton({ buttonName, type, loading, onClick, buttonIcon, variant, disable }) {
  return (
    <div>
      <LoadingButton sx={{display:"flex",gap:"5px"}} type={type} className='w-full' loading={loading} variant={variant} onClick={onClick} disabled={disable}>{buttonIcon}{buttonName}</LoadingButton>
    </div>
  )
}

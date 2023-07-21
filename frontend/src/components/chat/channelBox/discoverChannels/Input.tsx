interface InputProps {
    placeholder: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
    const { placeholder, value, onChange } = props

    return <input placeholder={placeholder} value={value} onChange={onChange} />
}

export default Input

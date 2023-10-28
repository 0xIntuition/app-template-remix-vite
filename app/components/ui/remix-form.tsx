import type { FormProps, FormSchema } from 'remix-forms'
import { createForm } from 'remix-forms'
// For Remix, import it like this
import { cn } from '@/lib/utils/misc'
import {
  Form as FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit,
} from '@remix-run/react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const RemixForm = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
})

function Form<Schema extends FormSchema>(props: FormProps<Schema>) {
  return (
    <RemixForm<Schema>
      className={'flex flex-col space-y-4'}
      fieldComponent={FormField}
      labelComponent={FormLabel}
      inputComponent={Input}
      // multilineComponent={/* your custom Multiline */}
      // selectComponent={Select}
      // checkboxComponent={Checkbox}
      // checkboxWrapperComponent={/* your custom checkbox wrapper */}
      buttonComponent={FormButton}
      fieldErrorsComponent={FormError}
      // globalErrorsComponent={/* your custom GlobalErrors */}
      errorComponent={FormError}
      {...props}
    />
  )
}

function FormField({ className, ...props }: JSX.IntrinsicElements['div']) {
  return <div className={cn('flex flex-col space-y-2', className)} {...props} />
}

function FormLabel({
  className,
  ref,
  ...props
}: JSX.IntrinsicElements['label']) {
  return <Label className={cn(className)} {...props} />
}

function FormError({ className, ref, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div className={cn('text-xs text-destructive', className)} {...props} />
  )
}

export default function FormButton({
  className,
  ref,
  ...props
}: JSX.IntrinsicElements['button']) {
  return <Button className={cn(className)} variant={'outline'} {...props} />
}

export { Form }

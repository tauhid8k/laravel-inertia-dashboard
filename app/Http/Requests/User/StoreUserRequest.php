<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role' => ['required', 'string', 'exists:roles,name', function ($attribute, $value, $fail) {
                if ($value === 'admin') {
                    $fail("The {$attribute} is invalid.");
                }
            }],
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'job_title' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'username' => ['required', 'string', 'unique:users,username'],
            'password' => ['required', 'string', 'min:8'],
            'email' => ['required', 'email', 'unique:users,email'],
            'secondary_email' => ['nullable', 'string', 'email'],
            'address_line' => ['required', 'string'],
            'address_line_two' => ['nullable', 'string'],
            'city' => ['required', 'string'],
            'state' => ['required', 'string'],
            'postal_code' => ['required', 'string'],
            'country' => ['required', 'string'],
            'gender' => ['required', 'in:male,female,other'],
            'birthday' => ['required', 'date'],
            'skype' => ['nullable', 'string'],
            'color_profile' => ['required', 'string'],
            'status' => ['in:active,inactive,suspended'],
        ];
    }
}

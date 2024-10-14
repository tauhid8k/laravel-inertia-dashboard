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
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'job_title' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username,'],
            'password' => ['required', 'string', 'min:8'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'],
            'secondary_email' => ['nullable', 'email', 'max:255'],
            'address_line' => ['required', 'string', 'max:255'],
            'address_line_two' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:20'],
            'country' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'in:male,female,other'],
            'birthday' => ['required', 'date'],
            'skype' => ['nullable', 'string', 'max:255'],
            'color_profile' => ['required', 'string', 'max:255'],
            'profile_img' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'status' => ['in:active,inactive,suspended'],
        ];
    }
}

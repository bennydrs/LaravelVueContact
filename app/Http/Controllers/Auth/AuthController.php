<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Laravel\Passport\Client as OClient;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $oClient = OClient::where('password_client', 1)->first();
        $response = Http::post('http://localhost/LaravelVueContact/public/oauth/token', [
                'grant_type' => 'password',
                'client_id' => $oClient->id,
                'client_secret' => $oClient->secret,
                'username' => $request->email,
                'password' => $request->password,
                'scope' => ''
            
        ]);

        if($response->clientError()){
            return $response->json('username atau password salah', 400);
        } else if($response->serverError()){
            return $response->json('server error', 500);
        }

        return $response->body();
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json('berhasil registrasi', 200);
    }

    public function logout()
    {
        Auth::user()->tokens->each(function($token, $key){
            $token->delete();
        });

        return response()->json('log out berhasil', 200);
    }
}

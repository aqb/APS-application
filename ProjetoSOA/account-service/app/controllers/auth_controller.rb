class AuthController < ApplicationController
    before_action :authorize_request, except: :login

    def login
        @user = User.find_by_email(params[:email])
        if @user&.authenticate(params[:password])
            token = JsonWebToken.encode(user_id: @user.id)
            time = Time.now + 24.hours.to_i
            render json: {
                token: token,
                exp: time.strftime("%m-%d-%Y %H:%M"),
                user: @user.as_json(except: [:password_digest, :created_at, :updated_at])
            }, status: :ok
        else
            render json: { errros: ['Invalid Credentials'] }, status: :unauthorized
        end
    end
    
    def me
        render json: @current_user.as_json(except: [:password_digest, :created_at, :updated_at]),
          status: :ok
      end

    private

    def login_params
        params.permit(:email, :password)
    end

end

class TeachersController < ApplicationController
  def index
    teachers = Teacher.all
    teacher_array = []
    teachers.each do |teacher|
      teacher_array << {id: teacher.id, name: teacher.name}
    end
    teachers_json = teacher_array.to_json
    render json: teachers_json
  end

  def show
    teacher = Teacher.find(params[:id])
    badges = teacher.badges.order(votes: :desc)
    teacher_json = {id: teacher.id, name: teacher.name, badges: badges}.to_json
    render json: teacher_json
  end
end

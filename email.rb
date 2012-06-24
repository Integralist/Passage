require 'net/smtp'

=begin
	http://apidock.com/ruby/v1_9_3_125/Net/SMTP/start/class
	https://devcenter.heroku.com/articles/config-vars
	heroku config:add GM_USR=xxxx
	heroku config:add GM_PSW=xxxx
=end

class Email
	def initialize (to, from, subject, body)
		@to = to
		@from = from
		@subject = subject
		@body = body
		@message = <<MESSAGE_CONTENT
			From: User <#{@from}>
		    To: Your Name <#{@to}>
		    MIME-Version: 1.0
		    Content-type: text/html
		    Subject: #{@subject}
		    #{@body}
MESSAGE_CONTENT

		@smtp = Net::SMTP.new('smtp.gmail.com', 587)
	end
	
	def send_email
		@smtp.enable_starttls
		@smtp.start('yourdomain.com', ENV['GM_USR'], ENV['GM_PSW'], :login) do |smtp|
			@smtp.send_message(@message, @from, @to)
		end
	end
end
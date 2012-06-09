require 'net/smtp'

class Email
	def initialize (to, from, subject, body)
		@to = to
		@from = from
		@subject = subject
		@body = body
		@message = <<MESSAGE_CONTENT
			From: Storm <#{@from}>
		    To: Mark McDonnell <#{@to}>
		    MIME-Version: 1.0
		    Content-type: text/html
		    Subject: #{@subject}
		    #{@body}
MESSAGE_CONTENT
	end
	
	def send_email
		Net::SMTP.start('mail.stormcreative.co.uk', 25, 'localhost', @from, '$Uf?Pr4n', :plain) do |smtp|
			smtp.send_message(@message, @from, @to)
		end
	end
end

=begin
	 = 
=end